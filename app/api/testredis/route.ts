import { getRedisClient } from "@/lib/redisclient";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    if(req.method !== "POST") {
        return NextResponse.json({ msg: "Method is not supported!" }, { status: 405 });
    }

    try {
        const redisClient = await getRedisClient();

        const body = await req.json();
        const { title, description, tags, content } = body;

        if(!title || !description || !tags || !content) {
            return NextResponse.json({
                msg: "Please send all the data in the correct format!!!",
                required: { title: "string", description: "string", tags: "string[]", content: "string" }
            }, { status: 400 })
        }

        // For testing: Find or create a test user
        let testUser = await prisma.user.findFirst({
            where: {
                email: "test@blogforge.com"
            }
        });

        if (!testUser) {
            // Create a test user if doesn't exist
            testUser = await prisma.user.create({
                data: {
                    email: "test@blogforge.com",
                    name: "Test User",
                    password: "$2a$10$TESTPASSWORDHASH" // Dummy hash, won't be used for login
                }
            });
        }

        const post = await prisma.post.create({
            data: {
                title,
                description,
                tags: Array.isArray(tags) ? tags : [tags],
                content,
                authorId: testUser.id
            }
        })

        if(!post) {
            return NextResponse.json({
                msg: "Failed to create post at the moment!"
            }, { status: 500 })
        }

        // Cache in Redis
        const cacheKey = `blog:${post.id}`;
        await redisClient.set(
            cacheKey,
            JSON.stringify(post),
            { EX: 3600 } // Expire after 1 hour
        );

        return NextResponse.json({
            msg: "Success! Post created and cached in Redis",
            post,
            redis: {
                cached: true,
                key: cacheKey,
                ttl: 3600
            }
        })
    } catch(err) {
        console.log("Error occurred while storing the post: " + err);
        return NextResponse.json({ 
            msg: "Error creating post",
            error: err instanceof Error ? err.message : String(err)
        }, { status: 500 })
    } 
}

// GET endpoint to test Redis retrieval
export async function GET(req: NextRequest) {
    try {
        const redisClient = await getRedisClient();
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('id');

        if (!postId) {
            return NextResponse.json({
                msg: "Please provide a post ID",
                example: "/api/testredis?id=your-post-id"
            }, { status: 400 });
        }

        const cacheKey = `blog:${postId}`;
        
        // Try Redis first
        const cachedPost = await redisClient.get(cacheKey);
        
        if (cachedPost) {
            return NextResponse.json({
                msg: "Retrieved from Redis cache",
                source: "redis",
                post: JSON.parse(cachedPost)
            });
        }

        // Fallback to database
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });

        if (!post) {
            return NextResponse.json({
                msg: "Post not found"
            }, { status: 404 });
        }

        // Cache it for next time
        await redisClient.set(cacheKey, JSON.stringify(post), { EX: 3600 });

        return NextResponse.json({
            msg: "Retrieved from database and cached",
            source: "database",
            post
        });

    } catch (err) {
        console.log("Error retrieving post: " + err);
        return NextResponse.json({
            msg: "Error retrieving post",
            error: err instanceof Error ? err.message : String(err)
        }, { status: 500 });
    }
}
import { getRedisClient } from "@/lib/redisclient";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
    if(req.method != "POST") {
        return NextResponse.json({ msg: "Method is not supported!" });
    }

    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }
        
        const redisClient = await getRedisClient();

        const body = await req.json();
        const { title, description, tags, content } = body;

        if(!title || !description || !tags || !content) {
            return NextResponse.json({
                msg: "Please send all the data in the correct format!!!"
            })
        }

        const post = await prisma.post.create({
            data: {
                title,
                description,
                tags,
                content,
                authorId: session?.user?.id
            }
        })
        if(!post) {
            return NextResponse.json({
                msg: "Failed to create post at the moment!"
            })
        }

        const cacheKey = `blog:${post.id}`;
        await redisClient.set(
            cacheKey,
            JSON.stringify(post),
            { EX: 3600 }
        );

        return NextResponse.json({
            msg: "Success",
            post
        })
    } catch(err) {
        console.log("Error occurred while storing the post: " + err);
        return NextResponse.json({ 
            msg: err
        })
    } 
}
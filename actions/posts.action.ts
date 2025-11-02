'use server'

import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { Post } from '@/types/posts'
import { getRedisClient } from '@/lib/redisclient'
import { matchesGlob } from 'path'

const createpostSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
	description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
	content: z.string().min(1, 'Content is required'),
	tags: z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed')
})

export async function createPost(data: { title: string; description: string; content: string; tags: string[] }) {
	const session = await getSession()

	if (!session?.user?.id) {
		redirect('/signin')
	}

	try {
		const validatedData = createpostSchema.parse(data);
		const redis = await getRedisClient();

		const post = await prisma.post.create({
			data: {
				title: validatedData.title,
				description: validatedData.description,
				content: validatedData.content,
				tags: validatedData.tags,
				authorId: session.user.id,
			}
		})

		if (!post) {
			return {
				success: false,
				msg: "Post creation failed!!!"
			}
		}

		const cacheKey = `post:${post.id}`;
		await redis.set(
			cacheKey,
			JSON.stringify(post),
			{
				EX: 3600
			}
		)

		return {
			success: true,
			msg: 'post created successfully!',
			post
		}
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				msg: 'Validation error',
				errors: error
			}
		}

		console.error('Error creating post:', error)
		return {
			success: false,
			msg: 'Failed to create post. Please try again.'
		}
	}
}

export async function getAllPosts(page: number = 1, pageSize: number = 9) {
	try {
		const skip = (page - 1) * pageSize

		const [posts, totalCount] = await Promise.all([
			prisma.post.findMany({
				skip,
				take: pageSize,
				orderBy: {
					createdAt: 'desc'
				},
				include: {
					author: {
						select: {
							id: true,
							name: true,
							image: true
						}
					}
				}
			}),
			prisma.post.count()
		])

		const totalPages = Math.ceil(totalCount / pageSize)

		return {
			posts,
			pagination: {
				currentPage: page,
				totalPages,
				totalItems: totalCount,
				hasNextPage: page < totalPages,
				hasPreviousPage: page > 1
			}
		}
	} catch (error) {
		console.error('Error fetching posts:', error)
		return {
			posts: [],
			pagination: {
				currentPage: 1,
				totalPages: 0,
				totalItems: 0,
				hasNextPage: false,
				hasPreviousPage: false
			}
		}
	}
}

export async function getUserPosts() {
	const session = await getSession()

	if (!session?.user?.id) {
		return { posts: [] }
	}

	try {
		const posts = await prisma.post.findMany({
			where: {
				authorId: session.user.id
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: {
				id: true,
				title: true,
				description: true,
				createdAt: true,
				updatedAt: true,
				tags: true,
				author: {
					select: {
						id: true,
						name: true,
						image: true
					}
				}
			}
		})

		return { posts }
	} catch (error) {
		console.error('Error fetching user posts:', error)
		return { posts: [] }
	}
}

export async function getPostById(id: string): Promise<{ post?: Post | null }> {
	if (!id) {
		return {
			post: null
		}
	}

	try {
		// Checking in redis cache first:
		const redis = await getRedisClient();
		console.log("Checking in redis cache first")

		const postDeatails = await redis.get(id);
		if (!postDeatails) {

		}

		// Now looking on database as redis cache check is failed.
		console.log("Now looking on database as redis cache check is failed.")
		const databasePost = await prisma.post.findUnique({
			where: { id },
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
					},
				},
			},
		})

		if (!databasePost) {
			return {
				post: null
			}
		}

		const cacheKey = `post:${databasePost.id}`
		await redis.set(
			cacheKey,
			JSON.stringify(databasePost),
			{
				EX: 3600
			}
		)

		return { post: databasePost as Post }
	} catch (error) {
		console.error('Error fetching post:', error)
		return { post: null }
	}
}
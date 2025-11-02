'use server'

import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { Blog } from '@/types/posts'

const createBlogSchema = z.object({
	title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
	description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
	content: z.string().min(1, 'Content is required'),
	tags: z.array(z.string()).min(1, 'At least one tag is required').max(5, 'Maximum 5 tags allowed')
})

export async function createBlog(data: { title: string; description: string; content: string; tags: string[] }) {
	const session = await getSession()

	if (!session?.user?.id) {
		redirect('/signin')
	}

	try {
		const validatedData = createBlogSchema.parse(data)

		await prisma.post.create({
			data: {
				title: validatedData.title,
				description: validatedData.description,
				content: validatedData.content,
				tags: validatedData.tags,
				authorId: session.user.id,
			}
		})

		return { success: true, message: 'Blog created successfully!' }
	} catch (error) {
		if (error instanceof z.ZodError) {
			return {
				success: false,
				message: 'Validation error',
				errors: error
			}
		}

		console.error('Error creating blog:', error)
		return {
			success: false,
			message: 'Failed to create blog. Please try again.'
		}
	}
}

export async function getUserBlogs() {
	const session = await getSession()

	if (!session?.user?.id) {
		return { blogs: [] }
	}

	try {
		const blogs = await prisma.post.findMany({
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
				tags: true
			}
		})

		return { blogs }
	} catch (error) {
		console.error('Error fetching user blogs:', error)
		return { blogs: [] }
	}
}

export async function getBlogById(id: string): Promise<{ blog: Blog | null }> {
	try {
		const blog = await prisma.post.findUnique({
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

		if (!blog) {
			return { blog: null }
		}

		return { blog: blog as Blog }
	} catch (error) {
		console.error('Error fetching blog:', error)
		return { blog: null }
	}
}
'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getAllPosts } from '@/actions/posts.action'
import { BlogCard } from '@/components/blog-card'
import { Pagination } from '@/components/pagination'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { BlogListItem, PaginationData } from '@/types/posts'

function BlogsListSkeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{
				Array.from({ length: 9 }).map((_, i) => (
					<Card key={i} className="h-full">
						<CardContent className="p-6">
							<Skeleton className="aspect-video w-full rounded-lg mb-4" />
							<Skeleton className="h-6 w-3/4 mb-2" />
							<Skeleton className="h-4 w-full mb-1" />
							<Skeleton className="h-4 w-2/3 mb-4" />
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Skeleton className="h-6 w-6 rounded-full" />
									<Skeleton className="h-4 w-20" />
								</div>
								<Skeleton className="h-4 w-16" />
							</div>
						</CardContent>
					</Card>
				))
			}
		</div>
	)
}

function BlogsPageContent() {
	const searchParams = useSearchParams()
	const [blogs, setBlogs] = useState<BlogListItem[]>([])
	const [pagination, setPagination] = useState<PaginationData>({
		currentPage: 1,
		totalPages: 0,
		totalItems: 0,
		hasNextPage: false,
		hasPreviousPage: false
	})
	const [isLoading, setIsLoading] = useState(true)

	const currentPage = Number(searchParams.get('page')) || 1

	useEffect(() => {
		async function fetchBlogs() {
			setIsLoading(true)
			// Scroll to top when page changes
			window.scrollTo({ top: 0, behavior: 'smooth' })

			try {
				const { blogs: fetchedBlogs, pagination: paginationData } = await getAllPosts(currentPage)
				setBlogs(fetchedBlogs)
				setPagination(paginationData)
			} catch (error) {
				console.error('Error fetching blogs:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchBlogs()
	}, [currentPage])

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold mb-4">All Blog Posts</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					Discover stories, thinking, and expertise from writers on any topic.
				</p>
			</div>

			{isLoading ? (
				<BlogsListSkeleton />
			) : blogs.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">📚</div>
					<h2 className="text-2xl font-semibold mb-2">No blogs found</h2>
					<p className="text-muted-foreground">
						Be the first to create a blog post!
					</p>
				</div>
			) : (
				<div className="space-y-8">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{
							blogs.map((blog) => (
								<BlogCard
									key={blog.id}
									title={blog.title}
									description={blog.description}
									tags={blog.tags}
									author={{
										name: blog.author.name || 'Anonymous',
										image: blog.author.image || undefined
									}}
									createdAt={blog.createdAt}
									href={`/posts/${blog.id}`}
								/>
							))
						}
					</div>

					<Pagination
						currentPage={pagination.currentPage}
						totalPages={pagination.totalPages}
						hasNextPage={pagination.hasNextPage}
						hasPreviousPage={pagination.hasPreviousPage}
					/>
				</div>
			)}
		</div>
	)
}

export default function BlogsPage() {
	return (
		<Suspense fallback={<BlogsListSkeleton />}>
			<BlogsPageContent />
		</Suspense>
	)
}
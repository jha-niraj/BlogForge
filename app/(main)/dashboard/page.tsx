import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UserBlogsList } from './components/user-blogs-list'
import { getUserBlogs } from '@/actions/blogs.action'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PenSquare, BookOpen, Eye, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
	const session = await getSession()

	if (!session?.user?.id) {
		redirect('/signin')
	}

	const { blogs } = await getUserBlogs()

	// Calculate stats
	const totalBlogs = blogs.length
	const totalTags = new Set(blogs.flatMap(blog => blog.tags)).size
	const recentBlogs = blogs.filter(blog => {
		const daysSinceCreation = Math.floor((Date.now() - new Date(blog.createdAt).getTime()) / (1000 * 60 * 60 * 24))
		return daysSinceCreation <= 7
	}).length

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			{/* Welcome Section */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Welcome back, {session.user.name}! 👋</h1>
				<p className="text-muted-foreground text-lg">
					Here&apos;s an overview of your blogging activity
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<Card className="border-l-4 border-l-primary">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
						<BookOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalBlogs}</div>
						<p className="text-xs text-muted-foreground mt-1">
							All time publications
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-green-500">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Recent Posts</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{recentBlogs}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Published this week
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-purple-500">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Unique Tags</CardTitle>
						<Eye className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{totalTags}</div>
						<p className="text-xs text-muted-foreground mt-1">
							Different topics covered
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Create New</CardTitle>
						<PenSquare className="h-4 w-4 text-orange-600" />
					</CardHeader>
					<CardContent>
						<Link href="/create">
							<Button className="w-full mt-2" size="sm">
								<Plus className="mr-2 h-4 w-4" />
								New Blog Post
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>

			{/* User Blogs Section */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-semibold">Your Blog Posts</h2>
						<p className="text-muted-foreground">
							{totalBlogs === 0 
								? "You haven't created any blog posts yet" 
								: `Manage and view your ${totalBlogs} blog ${totalBlogs === 1 ? 'post' : 'posts'}`
							}
						</p>
					</div>
					{totalBlogs > 0 && (
						<Link href="/create">
							<Button>
								<PenSquare className="mr-2 h-4 w-4" />
								Create New Blog
							</Button>
						</Link>
					)}
				</div>
				<UserBlogsList blogs={blogs} />
			</div>
		</div>
	)
}
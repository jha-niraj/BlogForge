'use server'

import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function getTrendingPosts(limit: number = 10) {
	try {
		// Get posts with most views/engagement in last 7 days
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

		const posts = await prisma.post.findMany({
			where: {
				createdAt: {
					gte: sevenDaysAgo
				}
			},
			take: limit,
			orderBy: {
				createdAt: 'desc' // TODO: Replace with engagement score when analytics are added
			},
			include: {
				author: {
					select: {
						id: true,
						name: true,
						image: true,
						email: true
					}
				}
			}
		})

		return { success: true, posts }
	} catch (error) {
		console.error('Error fetching trending posts:', error)
		return { success: false, posts: [] }
	}
}

export async function getForYouPosts(limit: number = 10) {
	try {
		const session = await getSession()
		
		if (!session?.user?.id) {
			// If not logged in, show recent popular posts
			return getTrendingPosts(limit)
		}

		// TODO: Implement personalized recommendations based on user's reading history and tags
		// For now, get posts from tags the user has written about
		const userPosts = await prisma.post.findMany({
			where: {
				authorId: session.user.id
			},
			select: {
				tags: true
			}
		})

		const userTags = [...new Set(userPosts.flatMap(post => post.tags))]

		if (userTags.length === 0) {
			// If user hasn't written anything, show trending
			return getTrendingPosts(limit)
		}

		const posts = await prisma.post.findMany({
			where: {
				tags: {
					hasSome: userTags
				},
				authorId: {
					not: session.user.id // Don't show user's own posts
				}
			},
			take: limit,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				author: {
					select: {
						id: true,
						name: true,
						image: true,
						email: true
					}
				}
			}
		})

		return { success: true, posts }
	} catch (error) {
		console.error('Error fetching for you posts:', error)
		return { success: false, posts: [] }
	}
}

export async function getFollowingPosts(limit: number = 10) {
	try {
		const session = await getSession()
		
		if (!session?.user?.id) {
			return { success: false, posts: [], message: 'Please sign in to see posts from people you follow' }
		}

		// TODO: Implement following system
		// For now, return empty array as following feature doesn't exist yet
		return { 
			success: true, 
			posts: [],
			message: 'Follow feature coming soon! Start following your favorite authors.'
		}
	} catch (error) {
		console.error('Error fetching following posts:', error)
		return { success: false, posts: [], message: 'Error loading posts' }
	}
}

export async function getTopAuthors(limit: number = 5) {
	try {
		// Get authors with most posts in last 30 days
		const thirtyDaysAgo = new Date()
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

		const authors = await prisma.user.findMany({
			where: {
				blogs: {
					some: {
						createdAt: {
							gte: thirtyDaysAgo
						}
					}
				}
			},
			take: limit,
			select: {
				id: true,
				name: true,
				image: true,
				email: true,
				_count: {
					select: {
						blogs: true
					}
				}
			},
			orderBy: {
				blogs: {
					_count: 'desc'
				}
			}
		})

		return { success: true, authors }
	} catch (error) {
		console.error('Error fetching top authors:', error)
		return { success: false, authors: [] }
	}
}

export async function getUserStats() {
	try {
		const session = await getSession()
		
		if (!session?.user?.id) {
			return { 
				success: false, 
				stats: null,
				message: 'Please sign in to see your stats'
			}
		}

		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id
			},
			select: {
				_count: {
					select: {
						blogs: true
					}
				}
			}
		})

		const stats = {
			totalPosts: user?._count.blogs || 0,
			totalViews: 0, // TODO: Implement when analytics are added
			streak: 0, // TODO: Implement streak tracking
			xp: 0 // TODO: Implement XP system
		}

		return { success: true, stats }
	} catch (error) {
		console.error('Error fetching user stats:', error)
		return { 
			success: false, 
			stats: null,
			message: 'Error loading stats'
		}
	}
}

export async function getFeaturedPost() {
	try {
		// Get the most recent high-quality post (most engagement)
		const post = await prisma.post.findFirst({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				author: {
					select: {
						id: true,
						name: true,
						image: true,
						email: true
					}
				}
			}
		})

		return { success: true, post }
	} catch (error) {
		console.error('Error fetching featured post:', error)
		return { success: false, post: null }
	}
}

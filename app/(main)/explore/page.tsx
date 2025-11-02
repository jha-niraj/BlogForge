'use client'

import { useState, useEffect } from 'react'
import {
    Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs'
import { SwipeableCard } from '@/components/swipeable-card'
import { getTrendingPosts, getForYouPosts, getFollowingPosts } from '@/actions/explore.action'
import { Flame, Sparkles, Users, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Post {
    id: string
    title: string
    description: string
    content: string
    tags: string[]
    createdAt: Date
    author: {
        id: string
        name: string | null
        image: string | null
        email: string | null
    }
}

export default function ExplorePage() {
    const [activeTab, setActiveTab] = useState('trending')
    const [trendingPosts, setTrendingPosts] = useState<Post[]>([])
    const [forYouPosts, setForYouPosts] = useState<Post[]>([])
    const [followingPosts, setFollowingPosts] = useState<Post[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        setIsLoading(true)
        const [trending, forYou, following] = await Promise.all([
            getTrendingPosts(20),
            getForYouPosts(20),
            getFollowingPosts(20)
        ])

        if (trending.success) setTrendingPosts(trending.posts)
        if (forYou.success) setForYouPosts(forYou.posts)
        if (following.success) setFollowingPosts(following.posts)

        // Show message if following is empty
        if ('message' in following && following.message) {
            setMessage(following.message)
        }

        setIsLoading(false)
    }

    const getCurrentPosts = () => {
        switch (activeTab) {
            case 'trending':
                return trendingPosts
            case 'for-you':
                return forYouPosts
            case 'following':
                return followingPosts
            default:
                return []
        }
    }

    const handleSwipeLeft = () => {
        const posts = getCurrentPosts()
        if (currentIndex < posts.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handleSwipeRight = () => {
        // Card navigates to post page automatically
        // Just move to next card
        const posts = getCurrentPosts()
        if (currentIndex < posts.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setCurrentIndex(0) // Reset to first card when changing tabs
    }

    const currentPosts = getCurrentPosts()
    const currentPost = currentPosts[currentIndex]
    const hasMoreCards = currentIndex < currentPosts.length - 1

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Explore</h1>
                <p className="text-muted-foreground">
                    Discover amazing content tailored for you
                </p>
            </div>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="trending" className="flex items-center gap-2">
                        <Flame className="h-4 w-4" />
                        <span className="hidden sm:inline">Trending Now</span>
                        <span className="sm:hidden">Trending</span>
                    </TabsTrigger>
                    <TabsTrigger value="for-you" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        <span className="hidden sm:inline">For You</span>
                        <span className="sm:hidden">For You</span>
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Following</span>
                        <span className="sm:hidden">Following</span>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="trending" className="mt-6">
                    {
                        isLoading ? (
                            <Card className="p-12 flex items-center justify-center">
                                <div className="text-center space-y-2">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Loading trending posts...</p>
                                </div>
                            </Card>
                        ) : currentPost ? (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {currentIndex + 1} / {currentPosts.length}
                                    </p>
                                </div>
                                <div className="relative h-[600px]">
                                    <SwipeableCard
                                        key={currentPost.id}
                                        post={currentPost}
                                        onSwipeLeft={handleSwipeLeft}
                                        onSwipeRight={handleSwipeRight}
                                    />
                                </div>
                                {
                                    hasMoreCards && (
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">
                                                {currentPosts.length - currentIndex - 1} more posts to explore
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    !hasMoreCards && (
                                        <Card className="p-8 text-center">
                                            <p className="text-lg font-semibold mb-2">🎉 You&apos;ve seen all trending posts!</p>
                                            <p className="text-sm text-muted-foreground">
                                                Check back later for more content or explore other tabs
                                            </p>
                                        </Card>
                                    )
                                }
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <p className="text-lg font-semibold mb-2">No trending posts yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Be the first to create amazing content!
                                </p>
                            </Card>
                        )
                    }
                </TabsContent>
                <TabsContent value="for-you" className="mt-6">
                    {
                        isLoading ? (
                            <Card className="p-12 flex items-center justify-center">
                                <div className="text-center space-y-2">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Personalizing your feed...</p>
                                </div>
                            </Card>
                        ) : currentPost ? (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {currentIndex + 1} / {currentPosts.length}
                                    </p>
                                </div>
                                <div className="relative h-[600px]">
                                    <SwipeableCard
                                        key={currentPost.id}
                                        post={currentPost}
                                        onSwipeLeft={handleSwipeLeft}
                                        onSwipeRight={handleSwipeRight}
                                    />
                                </div>
                                {
                                    hasMoreCards && (
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">
                                                {currentPosts.length - currentIndex - 1} more posts tailored for you
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    !hasMoreCards && (
                                        <Card className="p-8 text-center">
                                            <p className="text-lg font-semibold mb-2">✨ You&apos;ve explored all personalized content!</p>
                                            <p className="text-sm text-muted-foreground">
                                                Write more posts to improve recommendations
                                            </p>
                                        </Card>
                                    )
                                }
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <p className="text-lg font-semibold mb-2">No personalized posts yet</p>
                                <p className="text-sm text-muted-foreground">
                                    Start writing to get personalized recommendations!
                                </p>
                            </Card>
                        )
                    }
                </TabsContent>
                <TabsContent value="following" className="mt-6">
                    {
                        isLoading ? (
                            <Card className="p-12 flex items-center justify-center">
                                <div className="text-center space-y-2">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Loading posts from your network...</p>
                                </div>
                            </Card>
                        ) : followingPosts.length > 0 && currentPost ? (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        {currentIndex + 1} / {currentPosts.length}
                                    </p>
                                </div>
                                <div className="relative h-[600px]">
                                    <SwipeableCard
                                        key={currentPost.id}
                                        post={currentPost}
                                        onSwipeLeft={handleSwipeLeft}
                                        onSwipeRight={handleSwipeRight}
                                    />
                                </div>
                                {
                                    hasMoreCards && (
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">
                                                {currentPosts.length - currentIndex - 1} more posts from people you follow
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    !hasMoreCards && (
                                        <Card className="p-8 text-center">
                                            <p className="text-lg font-semibold mb-2">👥 All caught up!</p>
                                            <p className="text-sm text-muted-foreground">
                                                You&apos;ve seen all posts from people you follow
                                            </p>
                                        </Card>
                                    )
                                }
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-lg font-semibold mb-2">Start Following Authors</p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {message || 'Follow your favorite authors to see their latest posts here'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    💡 Tip: Check out the Top Authors leaderboard to find interesting writers!
                                </p>
                            </Card>
                        )
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}
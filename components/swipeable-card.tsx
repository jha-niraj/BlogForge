'use client'

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

interface SwipeableCardProps {
	post: Post
	onSwipeLeft: () => void
	onSwipeRight: () => void
}

export function SwipeableCard({ post, onSwipeLeft, onSwipeRight }: SwipeableCardProps) {
	const router = useRouter()
	const [exitX, setExitX] = useState(0)
	const x = useMotionValue(0)
	const rotate = useTransform(x, [-200, 200], [-25, 25])
	const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

	const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		if (Math.abs(info.offset.x) > 100) {
			// Swiped
			setExitX(info.offset.x > 0 ? 200 : -200)
			
			if (info.offset.x > 0) {
				// Swiped right - view post
				setTimeout(() => {
					router.push(`/posts/${post.id}`)
				}, 300)
				onSwipeRight()
			} else {
				// Swiped left - next post
				setTimeout(() => {
					onSwipeLeft()
				}, 300)
			}
		}
	}

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})
	}

	return (
		<motion.div
			style={{
				x,
				rotate,
				opacity,
				cursor: 'grab'
			}}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			onDragEnd={handleDragEnd}
			animate={exitX !== 0 ? { x: exitX } : {}}
			transition={{ type: 'spring', stiffness: 300, damping: 30 }}
			className="absolute w-full"
			whileTap={{ cursor: 'grabbing' }}
		>
			<Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
				{/* Swipe indicators */}
				<motion.div
					className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent flex items-center justify-start pl-8 pointer-events-none z-10"
					style={{
						opacity: useTransform(x, [-100, 0], [1, 0])
					}}
				>
					<div className="text-4xl font-bold text-red-500 transform -rotate-12">
						SKIP
					</div>
				</motion.div>

				<motion.div
					className="absolute inset-0 bg-gradient-to-l from-green-500/20 to-transparent flex items-center justify-end pr-8 pointer-events-none z-10"
					style={{
						opacity: useTransform(x, [0, 100], [0, 1])
					}}
				>
					<div className="text-4xl font-bold text-green-500 transform rotate-12">
						READ →
					</div>
				</motion.div>

				{/* Card content */}
				<div className="p-6 space-y-4">
					{/* Author info */}
					<div className="flex items-center gap-3">
						<Avatar className="h-10 w-10">
							<AvatarImage src={post.author.image || undefined} />
							<AvatarFallback>
								{post.author.name?.charAt(0).toUpperCase() || 'U'}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="font-semibold text-sm">{post.author.name || 'Anonymous'}</p>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<Calendar className="h-3 w-3" />
								{formatDate(post.createdAt)}
							</div>
						</div>
					</div>

					{/* Title and description */}
					<div className="space-y-2">
						<h3 className="text-2xl font-bold line-clamp-2">{post.title}</h3>
						<p className="text-muted-foreground line-clamp-3">{post.description}</p>
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2">
						{post.tags.slice(0, 5).map((tag, idx) => (
							<Badge key={idx} variant="secondary">
								{tag}
							</Badge>
						))}
					</div>

					{/* Preview content */}
					<div className="prose prose-sm dark:prose-invert max-w-none">
						<p className="line-clamp-4 text-sm text-muted-foreground">
							{post.content.slice(0, 200)}...
						</p>
					</div>

					{/* Swipe instructions */}
					<div className="pt-4 border-t">
						<p className="text-xs text-center text-muted-foreground">
							👈 Swipe left to skip • Swipe right to read 👉
						</p>
					</div>
				</div>
			</Card>
		</motion.div>
	)
}

'use client'

import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal } from 'lucide-react'

interface Author {
	id: string
	name: string | null
	image: string | null
	email: string | null
	_count: {
		blogs: number
	}
}

interface LeaderboardProps {
	authors: Author[]
	isLoading?: boolean
}

export function Leaderboard({ authors, isLoading }: LeaderboardProps) {
	if (isLoading) {
		return (
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
					<Trophy className="h-5 w-5 text-yellow-500" />
					Top Authors
				</h3>
				<div className="space-y-3 animate-pulse">
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className="h-16 bg-muted rounded" />
					))}
				</div>
			</Card>
		)
	}

	const getRankIcon = (index: number) => {
		switch (index) {
			case 0:
				return <Trophy className="h-5 w-5 text-yellow-500" />
			case 1:
				return <Medal className="h-5 w-5 text-gray-400" />
			case 2:
				return <Medal className="h-5 w-5 text-amber-600" />
			default:
				return <span className="text-sm font-semibold text-muted-foreground">#{index + 1}</span>
		}
	}

	const getRankBg = (index: number) => {
		switch (index) {
			case 0:
				return 'bg-yellow-500/10 border-yellow-500/20'
			case 1:
				return 'bg-gray-500/10 border-gray-500/20'
			case 2:
				return 'bg-amber-500/10 border-amber-500/20'
			default:
				return 'bg-muted/50'
		}
	}

	if (authors.length === 0) {
		return (
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
					<Trophy className="h-5 w-5 text-yellow-500" />
					Top Authors
				</h3>
				<p className="text-sm text-muted-foreground text-center py-8">
					No authors yet. Be the first to post!
				</p>
			</Card>
		)
	}

	return (
		<Card className="p-6">
			<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
				<Trophy className="h-5 w-5 text-yellow-500" />
				Top Authors
			</h3>
			<div className="space-y-3">
				{authors.map((author, idx) => (
					<div
						key={author.id}
						className={`flex items-center gap-3 p-3 rounded-lg border transition-transform hover:scale-105 cursor-pointer ${getRankBg(idx)}`}
					>
						<div className="flex items-center justify-center w-8">
							{getRankIcon(idx)}
						</div>
						<Avatar className="h-10 w-10">
							<AvatarImage src={author.image || undefined} />
							<AvatarFallback>
								{author.name?.charAt(0).toUpperCase() || 'U'}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 min-w-0">
							<p className="font-semibold text-sm truncate">
								{author.name || 'Anonymous'}
							</p>
							<p className="text-xs text-muted-foreground">
								{author._count.blogs} {author._count.blogs === 1 ? 'post' : 'posts'}
							</p>
						</div>
						{idx < 3 && (
							<Badge variant="secondary" className="text-xs">
								Top {idx + 1}
							</Badge>
						)}
					</div>
				))}
			</div>
		</Card>
	)
}

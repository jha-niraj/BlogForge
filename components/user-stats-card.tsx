'use client'

import { Card } from '@/components/ui/card'
import { Flame, Star, Eye, TrendingUp } from 'lucide-react'

interface UserStats {
	totalPosts: number
	totalViews: number
	streak: number
	xp: number
}

interface UserStatsCardProps {
	stats: UserStats | null
	isLoading?: boolean
}

export function UserStatsCard({ stats, isLoading }: UserStatsCardProps) {
	if (isLoading) {
		return (
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Your Stats</h3>
				<div className="space-y-4 animate-pulse">
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className="h-12 bg-muted rounded" />
					))}
				</div>
			</Card>
		)
	}

	if (!stats) {
		return (
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Your Stats</h3>
				<p className="text-sm text-muted-foreground">Sign in to see your stats</p>
			</Card>
		)
	}

	const statItems = [
		{
			icon: Flame,
			label: 'Streak',
			value: stats.streak,
			suffix: 'days',
			color: 'text-orange-500',
			bgColor: 'bg-orange-500/10'
		},
		{
			icon: Star,
			label: 'XP',
			value: stats.xp,
			suffix: 'points',
			color: 'text-yellow-500',
			bgColor: 'bg-yellow-500/10'
		},
		{
			icon: Eye,
			label: 'Views',
			value: stats.totalViews,
			suffix: '',
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10'
		},
		{
			icon: TrendingUp,
			label: 'Posts',
			value: stats.totalPosts,
			suffix: '',
			color: 'text-green-500',
			bgColor: 'bg-green-500/10'
		}
	]

	return (
		<Card className="p-6">
			<h3 className="text-lg font-semibold mb-4">Your Stats</h3>
			<div className="space-y-3">
				{statItems.map((item, idx) => {
					const Icon = item.icon
					return (
						<div
							key={idx}
							className={`flex items-center gap-3 p-3 rounded-lg ${item.bgColor} transition-transform hover:scale-105`}
						>
							<div className={`${item.color}`}>
								<Icon className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<p className="text-xs text-muted-foreground">{item.label}</p>
								<p className="text-lg font-bold">
									{item.value.toLocaleString()}
									{item.suffix && <span className="text-xs ml-1 font-normal">{item.suffix}</span>}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</Card>
	)
}

import { getTopAuthors, getUserStats } from '@/actions/explore.action'
import { UserStatsCard } from '@/components/user-stats-card'
import { Leaderboard } from '@/components/leaderboard'

export default async function ExploreLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [statsResult, authorsResult] = await Promise.all([
		getUserStats(),
		getTopAuthors(5)
	])

	return (
		<div className="container mx-auto py-8 px-4">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
				{/* Main content area - Left side */}
				<div className="lg:col-span-8 space-y-6">
					{children}
				</div>

				{/* Sidebar - Right side */}
				<div className="lg:col-span-4 space-y-6">
					{/* User Stats */}
					<div className="sticky top-20">
						<UserStatsCard 
							stats={statsResult.stats || null}
						/>
					</div>

					{/* Leaderboard */}
					<div className="sticky top-[28rem]">
						<Leaderboard 
							authors={authorsResult.success ? (authorsResult.authors as Array<{
								id: string;
								name: string | null;
								image: string | null;
								email: string | null;
								_count: { blogs: number };
							}>) : []}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
import { getTopAuthors, getUserStats } from '@/actions/explore.action'
import { UserStatsCard } from '@/components/user-stats-card'
import { Leaderboard } from '@/components/leaderboard'
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: "Explore - Find the things that you love to read",
	description: "A modern, collaborative blogging platform where developers write, share, and discover technical content while learning modern web development.",
};

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
				<div className="lg:col-span-8 space-y-6">
					{children}
				</div>
				<div className="lg:col-span-4 space-y-6">
					<div className="sticky top-20">
						<UserStatsCard 
							stats={statsResult.stats || null}
						/>
					</div>
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
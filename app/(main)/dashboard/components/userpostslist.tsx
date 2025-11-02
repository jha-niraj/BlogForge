import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import Link from 'next/link'
import { PenSquare, Calendar, Tag } from 'lucide-react'
import { PostListItem } from '@/types/posts'

interface UserPostsListProps {
	posts: PostListItem[]
}

export function UserPostsList({ posts }: UserPostsListProps) {
	if (posts.length === 0) {
		return (
			<Card className="border-2 border-dashed">
				<CardContent className="text-center py-16">
					<div className="max-w-md mx-auto">
						<div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<PenSquare className="h-10 w-10 text-primary" />
						</div>
						<h3 className="text-2xl font-semibold mb-2">No blogs yet</h3>
						<p className="text-muted-foreground mb-6">
							Start your blogging journey by creating your first post. Share your knowledge, experiences, and ideas with the world!
						</p>
						<Link href="/create">
							<Button size="lg" className="gap-2">
								<PenSquare className="h-4 w-4" />
								Create Your First Blog
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		)
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{
				posts.map((post) => (
					<Link key={post.id} href={`/posts/${post.id}`}>
						<Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50">
							<CardContent className="p-5">
								<div className="space-y-3">
									<div>
										<h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
											{post.title}
										</h3>
										<p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
											{post.description}
										</p>
									</div>

									{
										post.tags.length > 0 && (
											<div className="flex items-center gap-1.5 flex-wrap">
												<Tag className="h-3 w-3 text-muted-foreground flex-shrink-0" />
												{
													post.tags.slice(0, 2).map((tag, index) => (
														<span
															key={index}
															className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded-md text-xs font-medium"
														>
															{tag}
														</span>
													))
												}
												{
													post.tags.length > 2 && (
														<span className="text-xs text-muted-foreground font-medium">
															+{post.tags.length - 2}
														</span>
													)
												}
											</div>
										)
									}

									<div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
										<Calendar className="h-3 w-3" />
										<span>{format(post.createdAt, 'MMM dd, yyyy')}</span>
										{
											post.updatedAt.getTime() !== post.createdAt.getTime() && (
												<span className="text-primary font-medium">(Updated)</span>
											)
										}
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))
			}
		</div>
	)
}
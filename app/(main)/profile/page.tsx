import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, User2, Github, Globe } from 'lucide-react'
import Link from 'next/link'

export default async function ProfilePage() {
	const session = await getSession()

	if (!session?.user) {
		redirect('/signin')
	}

	const { user } = session

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="space-y-6">
				{/* Profile Header */}
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Profile</CardTitle>
						<CardDescription>
							Your personal information and account details
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
							{/* Avatar */}
							<Avatar className="h-32 w-32 border-4 border-primary/20">
								<AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
								<AvatarFallback className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-4xl font-bold">
									{user.name?.split(' ').map(n => n[0]).join('') || user.email?.[0].toUpperCase() || 'U'}
								</AvatarFallback>
							</Avatar>

							{/* User Info */}
							<div className="flex-1 space-y-4 text-center md:text-left">
								<div>
									<h2 className="text-3xl font-bold mb-1">{user.name}</h2>
									<Badge variant="secondary" className="text-sm">
										{user.role || 'USER'}
									</Badge>
								</div>

								<div className="space-y-2">
									<div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
										<Mail className="h-4 w-4" />
										<span>{user.email}</span>
									</div>
									<div className="flex items-center gap-2 justify-center md:justify-start text-muted-foreground">
										<User2 className="h-4 w-4" />
										<span>Member since {new Date().toLocaleDateString()}</span>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Contribution Section */}
				<Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
					<CardHeader>
						<CardTitle className="text-2xl flex items-center gap-2">
							<Github className="h-6 w-6" />
							Contribute Here
						</CardTitle>
						<CardDescription>
							Help make BlogForge better! We welcome contributions from developers of all skill levels.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground">
							BlogForge is an open-source project. Whether you&apos;re fixing bugs, adding features, or improving documentation, 
							your contributions help make this platform better for everyone.
						</p>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
								<Github className="h-5 w-5 text-primary mt-0.5" />
								<div>
									<h3 className="font-semibold mb-1">GitHub Repository</h3>
									<p className="text-sm text-muted-foreground mb-2">
										Check out the code, open issues, and submit PRs
									</p>
									<Link href="https://github.com/jha-niraj/blogforge" target="_blank">
										<Button size="sm" variant="outline">
											View on GitHub
										</Button>
									</Link>
								</div>
							</div>

							<div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
								<Globe className="h-5 w-5 text-primary mt-0.5" />
								<div>
									<h3 className="font-semibold mb-1">Documentation</h3>
									<p className="text-sm text-muted-foreground mb-2">
										Read our contributing guide to get started
									</p>
									<Link href="https://github.com/jha-niraj/blogforge#readme" target="_blank">
										<Button size="sm" variant="outline">
											Read Docs
										</Button>
									</Link>
								</div>
							</div>
						</div>

						<div className="pt-4 border-t">
							<h4 className="font-semibold mb-3">Ways to Contribute:</h4>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									Report bugs and suggest features
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									Improve documentation and tutorials
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									Fix issues labeled as &quot;good first issue&quot;
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									Add new features and improvements
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-full bg-primary" />
									Help others in discussions and code reviews
								</li>
							</ul>
						</div>

						<div className="flex gap-3 pt-4">
							<Link href="https://github.com/jha-niraj/blogforge/issues" target="_blank">
								<Button className="gap-2">
									<Github className="h-4 w-4" />
									Browse Issues
								</Button>
							</Link>
							<Link href="https://github.com/jha-niraj/blogforge/blob/main/CONTRIBUTING.md" target="_blank">
								<Button variant="outline" className="gap-2">
									Contributing Guide
								</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

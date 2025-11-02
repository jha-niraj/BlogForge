import { 
	Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
	Avatar, AvatarFallback, AvatarImage 
} from '@/components/ui/avatar'
import { format } from 'date-fns'
import Link from 'next/link'

interface BlogCardProps {
	id: string
	title: string
	description: string
	content?: string
	tags: string[]
	author: {
		name: string
		image?: string
	}
	createdAt: Date
	showAuthor?: boolean
	href?: string
}

export function BlogCard({
	title,
	description,
	tags,
	author,
	createdAt,
	showAuthor = true,
	href
}: Omit<BlogCardProps, 'id'>) {
	const cardContent = (
		<Card className="h-full transition-all hover:shadow-lg">
			<CardHeader>
				<div className="aspect-video w-full rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 mb-4 flex items-center justify-center">
					<div className="text-4xl font-bold text-primary/30">
						{title.charAt(0).toUpperCase()}
					</div>
				</div>

				<CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
				<CardDescription className="line-clamp-3">{description}</CardDescription>

				{tags.length > 0 && (
					<div className="flex flex-wrap gap-1 mt-2">
						{tags.slice(0, 3).map((tag, index) => (
							<Badge key={index} variant="secondary" className="text-xs">
								{tag}
							</Badge>
						))}
						{tags.length > 3 && (
							<Badge variant="secondary" className="text-xs">
								+{tags.length - 3} more
							</Badge>
						)}
					</div>
				)}
			</CardHeader>

			<CardContent>
				<div className="flex items-center justify-between">
					{showAuthor && (
						<div className="flex items-center gap-2">
							<Avatar className="h-6 w-6">
								<AvatarImage src={author.image} alt={author.name} />
								<AvatarFallback className="text-xs">
									{author.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className="text-sm text-muted-foreground">{author.name}</span>
						</div>
					)}

					<time className="text-xs text-muted-foreground">
						{format(createdAt, 'dd MMM yyyy')}
					</time>
				</div>
			</CardContent>
		</Card>
	)

	if (href) {
		return (
			<Link href={href} className="block">
				{cardContent}
			</Link>
		)
	}

	return cardContent
}
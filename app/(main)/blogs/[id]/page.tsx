import { notFound } from 'next/navigation'
import {
	Avatar, AvatarFallback, AvatarImage
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getBlogById } from "@/actions/blogs.action"

interface BlogDetailPageProps {
	params: Promise<{ id: string }>
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
	const { id } = await params;
	const { blog } = await getBlogById(id)

	if (!blog) {
		notFound()
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<div className="mb-6">
				<Link href="/blogs">
					<Button variant="ghost" className="mb-4 -ml-4">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Blogs
					</Button>
				</Link>
			</div>
			<article className="space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold leading-tight lg:text-5xl">
						{blog.title}
					</h1>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						{blog.description}
					</p>
				</div>
				<div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground border-y py-6">
					<div className="flex items-center space-x-2">
						<User className="h-4 w-4" />
						<div className="flex items-center space-x-2">
							<Avatar className="h-6 w-6">
								<AvatarImage src={blog.author.image || undefined} alt={blog.author.name} />
								<AvatarFallback className="text-xs">
									{blog.author.name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<span className="font-medium">{blog.author.name}</span>
						</div>
					</div>
					<div className="flex items-center space-x-1">
						<Calendar className="h-4 w-4" />
						<time dateTime={blog.createdAt.toISOString()}>
							{format(blog.createdAt, 'MMMM dd, yyyy')}
						</time>
					</div>
				</div>
				{
					blog.tags.length > 0 && (
						<div className="flex flex-wrap justify-center gap-2">
							{
								blog.tags.map((tag, index) => (
									<Badge key={index} variant="secondary">
										{tag}
									</Badge>
								))
							}
						</div>
					)
				}
				<Card>
					<CardContent className="p-8 lg:p-12">
						<div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-pre:bg-muted prose-pre:border">
							<ReactMarkdown
								components={{
									code({ inline, className, children, ...props }) {
										const match = /language-(\w+)/.exec(className || '')
										return !inline && match ? (
											<SyntaxHighlighter
												style={oneDark}
												language={match[1]}
												PreTag="div"
												{...props}
											>
												{String(children).replace(/\n$/, '')}
											</SyntaxHighlighter>
										) : (
											<code className={className} {...props}>
												{children}
											</code>
										)
									},
									h1: ({ children }) => (
										<h1 className="text-3xl font-bold mt-12 mb-6 first:mt-0">
											{children}
										</h1>
									),
									h2: ({ children }) => (
										<h2 className="text-2xl font-semibold mt-10 mb-4">
											{children}
										</h2>
									),
									h3: ({ children }) => (
										<h3 className="text-xl font-semibold mt-8 mb-3">
											{children}
										</h3>
									),
									p: ({ children }) => (
										<p className="mb-4 leading-relaxed text-muted-foreground">
											{children}
										</p>
									),
									ul: ({ children }) => (
										<ul className="mb-4 space-y-1 list-disc pl-6">
											{children}
										</ul>
									),
									ol: ({ children }) => (
										<ol className="mb-4 space-y-1 list-decimal pl-6">
											{children}
										</ol>
									),
									blockquote: ({ children }) => (
										<blockquote className="border-l-4 border-primary/50 pl-6 italic my-6 text-muted-foreground">
											{children}
										</blockquote>
									),
									a: ({ children, href }) => (
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-primary hover:underline font-medium"
										>
											{children}
										</a>
									),
								}}
							>
								{blog.content}
							</ReactMarkdown>
						</div>
					</CardContent>
				</Card>
				<div className="text-center pt-8 border-t">
					<Link href="/blogs">
						<Button variant="outline">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to All Posts
						</Button>
					</Link>
				</div>
			</article>
		</div>
	)
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
	const { id } = await params
	const { blog } = await getBlogById(id)

	if (!blog) {
		return {
			title: 'Blog Not Found'
		}
	}

	return {
		title: blog.title,
		description: blog.description,
		authors: [{ name: blog.author.name }],
		keywords: blog.tags.join(', ')
	}
}
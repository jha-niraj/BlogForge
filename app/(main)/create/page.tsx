'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card'
import { MarkdownEditor } from '@/components/markdown-editor'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react'
import { createBlog } from '@/actions/blogs.action'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreateBlogPage() {
    const [isPending, startTransition] = useTransition()
    const [content, setContent] = useState('')
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        formData.set('content', content)

        startTransition(async () => {
            try {
                const result = await createBlog(formData)

                if (result.success) {
                    toast.success(result.message)
                    // Reset form
                    const form = document.getElementById('blog-form') as HTMLFormElement
                    form?.reset()
                    setContent('')
                    // Redirect to dashboard after 1 second
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 1000)
                } else {
                    toast.error(result.message)
                    console.log('Blog creation errors:', result.errors)
                }
            } catch (err) {
                console.log("Error occurred while creating the blog: " + err)
                toast.error('Something went wrong. Please try again.')
            }
        })
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold">Create New Blog Post</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Share your thoughts and expertise with the world
                </p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Blog Details</CardTitle>
                    <CardDescription>
                        Fill in the details below to create your blog post. Markdown is supported for content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="blog-form" action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter your blog title..."
                                required
                                disabled={isPending}
                                className="text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Write a brief description of your blog..."
                                required
                                disabled={isPending}
                                className="resize-none h-24"
                            />
                            <p className="text-xs text-muted-foreground">
                                This will appear as a preview in the blog list
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="nextjs, react, typescript, web development..."
                                disabled={isPending}
                            />
                            <p className="text-xs text-muted-foreground">
                                Separate tags with commas. Tags help others discover your content.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Content *</Label>
                            <MarkdownEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Write your blog content in Markdown...

                                    **Markdown Tips:**
                                    - Use # for headings
                                    - Use **text** for bold
                                    - Use *text* for italic
                                    - Use [text](url) for links
                                    - Use ```language for code blocks"
                            />
                            <p className="text-xs text-muted-foreground">
                                Support for Markdown syntax including code blocks, lists, and more.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={isPending || !content.trim()}
                                className="flex-1"
                                size="lg"
                            >
                                {
                                    isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" />
                                            Publish Blog Post
                                        </>
                                    )
                                }
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/dashboard')}
                                disabled={isPending}
                                size="lg"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
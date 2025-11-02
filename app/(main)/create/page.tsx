'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card'
import {
	Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from "@/components/ui/command"
import {
	Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover"
import { MarkdownEditor } from '@/components/markdown-editor'
import { toast } from 'sonner'
import { 
    Loader2, ArrowLeft, Sparkles, X, Plus, Check 
} from 'lucide-react'
import { createPost } from '@/actions/posts.action'
import { POPULAR_TAGS } from '@/types/posts'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function CreatePostPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleAddTag = (tag: string) => {
        const trimmedTag = tag.trim()
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
            setTags([...tags, trimmedTag])
            setTagInput('')
        } else if (tags.length >= 5) {
            toast.error('Maximum 5 tags allowed')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (tagInput.trim()) {
                handleAddTag(tagInput)
            }
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const toggleTag = (tag: string) => {
        if (tags.includes(tag)) {
            removeTag(tag)
        } else {
            handleAddTag(tag)
        }
        setOpen(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (tags.length === 0) {
            toast.error('Please add at least one tag')
            return
        }

        setIsSubmitting(true)

        try {
            const result = await createPost({
                title,
                description,
                content,
                tags
            })

            if (result.success) {
                toast.success(result.message || 'Blog created successfully!')
				setTitle('')
				setDescription('')
                setContent('')
                setTags([])
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
        } finally {
            setIsSubmitting(false)
        }
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

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Blog Details</CardTitle>
                        <CardDescription>
                            Fill in the basic information about your blog post
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter an engaging title..."
                                maxLength={200}
                                required
                                disabled={isSubmitting}
                            />
                            <p className="text-sm text-muted-foreground">
                                {title.length}/200 characters
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief description of your blog post..."
                                maxLength={500}
                                rows={3}
                                required
                                disabled={isSubmitting}
                            />
                            <p className="text-sm text-muted-foreground">
                                {description.length}/500 characters
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Tags * (Maximum 5)</Label>
                            
                            {/* Selected Tags Display */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                                    {tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="px-3 py-1 text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-2 hover:text-destructive"
                                                disabled={isSubmitting}
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-2">
                                {/* Custom Tag Input */}
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a tag and press Enter..."
                                    disabled={tags.length >= 5 || isSubmitting}
                                    className="flex-1"
                                />

                                {/* Popular Tags Dropdown */}
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={tags.length >= 5 || isSubmitting}
                                            className="w-[200px] justify-between"
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Popular Tags
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0" align="end">
                                        <Command>
                                            <CommandInput placeholder="Search tags..." />
                                            <CommandList>
                                                <CommandEmpty>No tags found.</CommandEmpty>
                                                <CommandGroup>
                                                    {POPULAR_TAGS.map((tag) => (
                                                        <CommandItem
                                                            key={tag}
                                                            value={tag}
                                                            onSelect={() => toggleTag(tag)}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                    tags.includes(tag)
                                                                        ? "bg-primary text-primary-foreground"
                                                                        : "opacity-50 [&_svg]:invisible"
                                                                )}
                                                            >
                                                                <Check className="h-4 w-4" />
                                                            </div>
                                                            <span>{tag}</span>
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {tags.length}/5 tags selected. Press Enter to add custom tags or choose from popular ones.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Content *</CardTitle>
                        <CardDescription>
                            Write your blog post in Markdown format
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Start writing your amazing blog post..."
                        />
                    </CardContent>
                </Card>

                <div className="flex gap-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/dashboard')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Creating...' : 'Create Blog Post'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

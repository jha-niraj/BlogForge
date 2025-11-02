// Blog/Post Types
export interface Author {
	id: string
	name: string
	email?: string
	image?: string | null
}

export interface Blog {
	id: string
	title: string
	description: string
	content: string
	tags: string[]
	published: boolean
	createdAt: Date
	updatedAt: Date
	author: Author
	authorId: string
}

export interface BlogListItem {
	id: string
	title: string
	description: string
	tags: string[]
	createdAt: Date
	updatedAt: Date
	author: {
		id: string
		name: string
		image?: string | null
	}
}

export interface PaginationData {
	currentPage: number
	totalPages: number
	totalItems: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export interface BlogsResponse {
	blogs: BlogListItem[]
	pagination: PaginationData
}

export interface UserBlog {
	id: string
	title: string
	description: string
	createdAt: Date
	updatedAt: Date
	tags: string[]
}

// Popular/Suggested Tags for the platform
export const POPULAR_TAGS = [
	'React',
	'Next.js',
	'TypeScript',
	'JavaScript',
	'Node.js',
	'Python',
	'Web Development',
	'Frontend',
	'Backend',
	'Full Stack',
	'API',
	'Database',
	'DevOps',
	'Cloud',
	'AI/ML',
	'Mobile',
	'CSS',
	'Tailwind CSS',
	'UI/UX',
	'Tutorial',
	'Best Practices',
	'Performance',
	'Security',
	'Testing',
	'Career',
] as const

export type PopularTag = typeof POPULAR_TAGS[number]
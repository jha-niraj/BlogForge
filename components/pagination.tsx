'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
	currentPage: number
	totalPages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
	basePath?: string
}

export function Pagination({
	currentPage,
	totalPages,
	hasNextPage,
	hasPreviousPage,
	basePath = '/posts'
}: PaginationProps) {
	const router = useRouter()
	const searchParams = useSearchParams()

	const navigateToPage = (page: number) => {
		const params = new URLSearchParams(searchParams.toString())
		if (page === 1) {
			params.delete('page')
		} else {
			params.set('page', page.toString())
		}

		const queryString = params.toString()
		const url = queryString ? `${basePath}?${queryString}` : basePath
		router.push(url)
	}

	const getPageNumbers = () => {
		const pages = []
		const showPages = 5 // Show 5 page numbers at most

		let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
		const endPage = Math.min(totalPages, startPage + showPages - 1)

		// Adjust if we're near the end
		if (endPage - startPage + 1 < showPages) {
			startPage = Math.max(1, endPage - showPages + 1)
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i)
		}

		return pages
	}

	if (totalPages <= 1) {
		return null
	}

	return (
		<div className="flex items-center justify-center space-x-2">
			<Button
				variant="outline"
				size="sm"
				onClick={() => navigateToPage(currentPage - 1)}
				disabled={!hasPreviousPage}
				className="flex items-center gap-1"
			>
				<ChevronLeft className="h-4 w-4" />
				Previous
			</Button>

			<div className="flex items-center space-x-1">
				{
					currentPage > 3 && (
						<>
							<Button
								variant="outline"
								size="sm"
								onClick={() => navigateToPage(1)}
							>
								1
							</Button>
							{currentPage > 4 && <span className="px-2">...</span>}
						</>
					)
				}
				{
					getPageNumbers().map((page) => (
						<Button
							key={page}
							variant={page === currentPage ? "default" : "outline"}
							size="sm"
							onClick={() => navigateToPage(page)}
							className="min-w-[2.5rem]"
						>
							{page}
						</Button>
					))
				}
				{
					currentPage < totalPages - 2 && (
						<>
							{currentPage < totalPages - 3 && <span className="px-2">...</span>}
							<Button
								variant="outline"
								size="sm"
								onClick={() => navigateToPage(totalPages)}
							>
								{totalPages}
							</Button>
						</>
					)
				}
			</div>
			<Button
				variant="outline"
				size="sm"
				onClick={() => navigateToPage(currentPage + 1)}
				disabled={!hasNextPage}
				className="flex items-center gap-1"
			>
				Next
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}
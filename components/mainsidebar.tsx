"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { 
	LogOut, MessageCircleCode, BookOpen, User, PenSquare, Compass, LayoutDashboard
} from "lucide-react"
import Link from "next/link"
import { 
	Tooltip, TooltipContent, TooltipProvider, TooltipTrigger 
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { 
	Avatar, AvatarFallback, AvatarImage 
} from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { ThemeToggle } from "./themeswitcher"
import { cn } from "@/lib/utils"

export interface Route {
	path: string
	name: string
	icon?: React.ReactNode
	status: string
}

const Sidebar = () => {
	const pathname = usePathname()
	const router = useRouter()
	const { data: session } = useSession()
	const { theme } = useTheme()
	const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false)
	const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false)
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
			if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current)
		}
	}, [])

	const handleMouseEnter = () => {
		// Clear any pending leave timeout
		if (leaveTimeoutRef.current) {
			clearTimeout(leaveTimeoutRef.current)
			leaveTimeoutRef.current = null
		}
		// Set a small delay before opening to prevent glitches
		hoverTimeoutRef.current = setTimeout(() => {
			setIsDesktopProfileOpen(true)
		}, 100)
	}

	const handleMouseLeave = () => {
		// Clear any pending enter timeout
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
			hoverTimeoutRef.current = null
		}
		// Set a delay before closing to allow moving to dropdown
		leaveTimeoutRef.current = setTimeout(() => {
			setIsDesktopProfileOpen(false)
		}, 150)
	}

	const isActiveRoute = (path: string) => {
		if (path === 'blogs') {
			return pathname === '/posts' || pathname === '/'
		}
		return pathname.includes(path)
	}

	const handleSignOut = async () => {
		try {
			await signOut({ callbackUrl: '/' })
		} catch (error) {
			console.error("Failed to sign out", error)
			toast.error("Failed to sign out")
		}
	}

	const handleNavigation = (path: string) => {
		router.push(`/${path}`)
	}

	const routes: Route[] = [
		{
			path: "explore",
			name: "Explore",
			icon: <Compass className="h-5 w-5" />,
			status: "active"
		},
		{
			path: "dashboard",
			name: "Dashboard",
			icon: <LayoutDashboard className="h-5 w-5" />,
			status: "active"
		},
		{
			path: "posts",
			name: "Posts",
			icon: <BookOpen className="h-5 w-5" />,
			status: "active"
		},
		{
			path: "create",
			name: "Create",
			icon: <PenSquare className="h-5 w-5" />,
			status: "active"
		},
	]

	const displayRoutes = routes.filter((route) => route.status === "active")

	return (
		<TooltipProvider>
			<div className="fixed top-0 left-0 h-full w-[90px] bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-black dark:to-slate-900 backdrop-blur-xl border-r border-border/20 shadow-2xl z-20 sm:block hidden">
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-center p-4 h-[80px] border-b border-border/50">
						<Link href="/" className="flex flex-col items-center justify-center group cursor-pointer">
							<Image
								src="/sajilodaanlogo.ico"
								alt="BlogForge"
								width={40}
								height={40}
								className="rounded-xl"
							/>
							<h1 className="text-xs font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent whitespace-nowrap mt-1">
								BlogForge
							</h1>
						</Link>
					</div>
					<div className="flex-grow overflow-y-auto py-4">
						<div className="space-y-1 px-2">
							{
								displayRoutes.map((route, index) => {
									const isActive = isActiveRoute(route.path)

									return (
										<Tooltip key={index}>
											<TooltipTrigger asChild>
												<motion.button
													onClick={() => handleNavigation(route.path)}
													className="block w-full cursor-pointer"
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.98 }}
													transition={{ duration: 0.1 }}
												>
													<div
														className={`
															${isActive
																? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
																: "hover:bg-muted/70 text-foreground"
															} 
															flex flex-col items-center justify-center rounded-xl transition-all duration-200 cursor-pointer group relative overflow-hidden px-3 py-3
														`}
													>
														{
															isActive && (
																<motion.div
																	layoutId="activeBackground"
																	className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-xl"
																	transition={{ duration: 0.2 }}
																/>
															)
														}
														<div className="relative z-10 flex flex-col items-center justify-center">
															<div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
																{route.icon}
															</div>
															<motion.span
																initial={{ opacity: 0, y: -5 }}
																animate={{ opacity: 1, y: 0 }}
																transition={{ delay: index * 0.05 }}
																className="text-xs font-medium truncate mt-1 text-center"
															>
																{route.name}
															</motion.span>
														</div>
													</div>
												</motion.button>
											</TooltipTrigger>
											<TooltipContent side='right'>
												<p>{route.name}</p>
											</TooltipContent>
										</Tooltip>
									)
								})
							}
						</div>
					</div>
					<div className="border-t border-border/50 p-3 mt-auto">
						<div className="space-y-1">
							<Tooltip>
								<TooltipTrigger asChild>
									<ThemeToggle />
								</TooltipTrigger>
								<TooltipContent side='right'>
									<p>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
								</TooltipContent>
							</Tooltip>
							{
								session?.user && (
									<>
										<div
											className="relative"
											onMouseEnter={handleMouseEnter}
											onMouseLeave={handleMouseLeave}
										>
											<Button
												variant="ghost"
												size="sm"
												className="w-full justify-center px-0 cursor-pointer p-2 pt-4"
											>
												<Avatar className="h-8 w-8 border-2 border-primary/20">
													<AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
													<AvatarFallback className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-bold">
														{session.user.name?.split(" ").map(n => n[0]).join("") || "U"}
													</AvatarFallback>
												</Avatar>
											</Button>
											{
												isDesktopProfileOpen && (
													<div
														className={cn(
															"absolute left-full ml-2 bottom-0 w-56 rounded-lg border shadow-2xl z-50",
															"bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl",
															"border-neutral-200/50 dark:border-neutral-800/50",
															"animate-in fade-in-0 zoom-in-95 duration-200"
														)}
													>
														<div className="px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
															<div className="flex flex-col space-y-1">
																<p className="text-sm font-medium leading-none">{session.user.name}</p>
																<p className="text-xs leading-none text-muted-foreground">
																	{session.user.email}
																</p>
															</div>
														</div>
														<div className="p-1">
															<button
																onClick={() => {
																	setIsDesktopProfileOpen(false)
																	router.push("/profile")
																}}
																className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-teal-50 dark:hover:bg-teal-950/20"
															>
																<User className="mr-2 h-4 w-4 text-teal-600" />
																<span>Profile</span>
															</button>
															<button
																onClick={() => {
																	setIsDesktopProfileOpen(false)
																	router.push("/feedback")
																}}
																className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/20"
															>
																<MessageCircleCode className="mr-2 h-4 w-4 text-purple-600" />
																<span>Feedback</span>
															</button>
														</div>
														<div className="border-t border-neutral-200 dark:border-neutral-800 p-1">
															<button
																onClick={() => {
																	setIsDesktopProfileOpen(false)
																	handleSignOut()
																}}
																className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400"
															>
																<LogOut className="mr-2 h-4 w-4" />
																<span>Sign Out</span>
															</button>
														</div>
													</div>
												)
											}
										</div>
									</>
								)
							}
						</div>
					</div>
				</div>
			</div>
			<div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-black dark:to-slate-900 border-t border-border/20 backdrop-blur-xl shadow-2xl z-20 pb-safe">
				<div className="grid grid-cols-5 items-center py-2 px-2 gap-1 w-full">
					{
						displayRoutes.slice(0, 3).map((route) => {
							const isActive = isActiveRoute(route.path)

							return (
								<button
									key={route.path}
									onClick={() => handleNavigation(route.path)}
									className={`flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-colors ${isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
								>
									<div className="w-5 h-5 flex items-center justify-center">
										{route.icon}
									</div>
									<span className="text-[10px] font-medium truncate max-w-full px-1">{route.name}</span>
								</button>
							)
						})
					}
					<ThemeToggle />

					{
						session?.user ? (
							<div className="relative">
								<button
									onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
									className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
								>
									<Avatar className="h-5 w-5 border-2 border-primary/20">
										<AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
										<AvatarFallback className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[8px] font-bold">
											{session.user.name?.split(" ").map(n => n[0]).join("") || "U"}
										</AvatarFallback>
									</Avatar>
									<span className="text-[10px] font-medium">Profile</span>
								</button>
								{
									isMobileProfileOpen && (
										<>
											<div
												className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
												onClick={() => setIsMobileProfileOpen(false)}
											/>
											<div
												className={cn(
													"absolute right-0 bottom-full mb-2 w-56 rounded-lg border shadow-2xl z-50",
													"bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl",
													"border-neutral-200/50 dark:border-neutral-800/50",
													"animate-in fade-in-0 zoom-in-95 duration-200"
												)}
											>
												<div className="px-3 py-2.5 border-b border-neutral-200 dark:border-neutral-800">
													<div className="flex flex-col space-y-1">
														<p className="text-sm font-medium leading-none">{session.user.name}</p>
														<p className="text-xs leading-none text-muted-foreground">
															{session.user.email}
														</p>
													</div>
												</div>
												<div className="p-1">
													<button
														onClick={() => {
															setIsMobileProfileOpen(false)
															router.push("/profile")
														}}
														className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-teal-50 dark:hover:bg-teal-950/20"
													>
														<User className="mr-2 h-4 w-4 text-teal-600" />
														<span>Profile</span>
													</button>
													<button
														onClick={() => {
															setIsMobileProfileOpen(false)
															router.push("/feedback")
														}}
														className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-purple-50 dark:hover:bg-purple-950/20"
													>
														<MessageCircleCode className="mr-2 h-4 w-4 text-purple-600" />
														<span>Feedback</span>
													</button>
												</div>
												<div className="border-t border-neutral-200 dark:border-neutral-800 p-1">
													<button
														onClick={() => {
															setIsMobileProfileOpen(false)
															handleSignOut()
														}}
														className="w-full flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400"
													>
														<LogOut className="mr-2 h-4 w-4" />
														<span>Sign Out</span>
													</button>
												</div>
											</div>
										</>
									)
								}
							</div>
						) : (
							<Button
								variant="ghost"
								size="icon"
								onClick={() => router.push('/signin')}
								className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50 h-auto"
							>
								<div className="w-5 h-5 flex items-center justify-center">
									<User className="h-5 w-5" />
								</div>
								<span className="text-[10px] font-medium">Login</span>
							</Button>
						)
					}
				</div>
			</div>
		</TooltipProvider>
	)
}

export default Sidebar;
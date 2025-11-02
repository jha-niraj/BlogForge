"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/navbar";
import {
	PenTool, BookOpen, Users, ArrowRight, Sparkles, Edit3, Zap, Layers, Shield, Heart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
	return (
		<>
			<Header />
			<main className="min-h-screen py-48 bg-white dark:bg-neutral-950 relative overflow-hidden">
				<div className="absolute inset-0">
					<motion.div
						className="absolute top-20 left-10 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl"
						animate={{
							x: [0, 100, 0],
							y: [0, -50, 0],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							repeatType: "reverse"
						}}
					/>
					<motion.div
						className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
						animate={{
							x: [0, -80, 0],
							y: [0, 60, 0],
						}}
						transition={{
							duration: 25,
							repeat: Infinity,
							repeatType: "reverse"
						}}
					/>
					<motion.div
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/15 rounded-full blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							repeatType: "reverse"
						}}
					/>
				</div>
				<section className="relative pb-16 px-4">
					<div className="max-w-7xl mx-auto">
						<div className="text-center mb-16">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-2 mb-8 shadow-lg"
							>
								<Sparkles className="w-4 h-4 text-indigo-600" />
								<span className="text-sm font-medium text-black dark:text-white">Welcome to the future of blogging</span>
								<Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
									Beta
								</Badge>
							</motion.div>
							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								className="text-5xl md:text-7xl font-bold text-black dark:text-white leading-tight mb-6"
							>
								Write. Share.
								<br />
								<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
									Inspire.
								</span>
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
							>
								Join thousands of writers sharing their stories on our modern blogging platform.
								Beautiful design meets powerful functionality.
							</motion.p>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="flex flex-col sm:flex-row gap-4 justify-center items-center"
							>
								<Link href="/posts">
									<Button
										size="lg"
										className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 h-14 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
									>
										<BookOpen className="w-6 h-6 mr-2" />
										Explore Stories
										<ArrowRight className="w-5 h-5 ml-2" />
									</Button>
								</Link>
								<Link href="/signin">
									<Button
										variant="outline"
										size="lg"
										className="border-2 border-gray-300 text-black dark:text-white px-8 py-4 h-14 text-lg font-semibold rounded-2xl transition-all duration-300 hover:border-indigo-300 hover:text-indigo-700"
									>
										<PenTool className="w-6 h-6 mr-2" />
										Start Writing
									</Button>
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
				<section className="relative py-20 px-4">
					<div className="max-w-7xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="text-center mb-16"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
								Everything you need to
								<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
									blog beautifully
								</span>
							</h2>
							<p className="text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
								Powerful features designed to make your writing experience seamless and enjoyable.
							</p>
						</motion.div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{
								[
									{
										icon: <Edit3 className="w-8 h-8" />,
										title: "Rich Markdown Editor",
										description: "Write with our intuitive editor featuring live preview, syntax highlighting, and all the markdown features you love.",
										gradient: "from-violet-500 to-purple-600",
										delay: 0
									},
									{
										icon: <Layers className="w-8 h-8" />,
										title: "Beautiful Themes",
										description: "Choose from stunning, responsive themes that make your content shine across all devices.",
										gradient: "from-blue-500 to-indigo-600",
										delay: 0.2
									},
									{
										icon: <Zap className="w-8 h-8" />,
										title: "Lightning Fast",
										description: "Built on Next.js 14 with server components for optimal performance and SEO.",
										gradient: "from-amber-500 to-orange-600",
										delay: 0.4
									},
									{
										icon: <Users className="w-8 h-8" />,
										title: "Community Driven",
										description: "Connect with fellow writers, get feedback, and grow your audience organically.",
										gradient: "from-emerald-500 to-teal-600",
										delay: 0
									},
									{
										icon: <Shield className="w-8 h-8" />,
										title: "Secure & Private",
										description: "Your data is protected with industry-standard security and privacy controls.",
										gradient: "from-red-500 to-pink-600",
										delay: 0.2
									},
									{
										icon: <Heart className="w-8 h-8" />,
										title: "Made with Love",
										description: "Crafted by writers, for writers. Every feature is designed with your needs in mind.",
										gradient: "from-rose-500 to-pink-600",
										delay: 0.4
									}
								].map((feature, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: feature.delay }}
										viewport={{ once: true }}
										className="group relative"
									>
										<div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
											<div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
												{feature.icon}
											</div>
											<h3 className="text-xl font-bold text-gray-900 mb-4">
												{feature.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{feature.description}
											</p>
										</div>
									</motion.div>
								))
							}
						</div>
					</div>
				</section>
				<section className="relative py-20 px-4">
					<div className="max-w-4xl mx-auto text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-12 shadow-2xl"
						>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								Ready to start your
								<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
									blogging journey?
								</span>
							</h2>
							<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
								Join thousands of writers who have already discovered the joy of sharing their stories with the world.
							</p>
							<Link href="/signin">
								<Button
									size="lg"
									className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-12 py-6 h-16 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
								>
									<PenTool className="w-6 h-6 mr-3" />
									Start Writing Today
									<ArrowRight className="w-6 h-6 ml-3" />
								</Button>
							</Link>
						</motion.div>
					</div>
				</section>
			</main>
		</>
	);
}
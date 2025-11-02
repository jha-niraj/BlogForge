"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Globe, BookOpen, Mic } from "lucide-react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function Waiting() {
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    const steps = [
        "Setting up your account...",
        "Preparing your learning environment...",
        "Customizing your experience...",
        "Almost there...",
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progress < 100) {
                setProgress((prev) => {
                    const newProgress = prev + 1

                    // Update step based on progress
                    if (newProgress > 75) setCurrentStep(3)
                    else if (newProgress > 50) setCurrentStep(2)
                    else if (newProgress > 25) setCurrentStep(1)

                    return newProgress
                })
            } else {
                // Redirect when complete
                router.push("/onboarding")
            }
        }, 50)

        return () => clearTimeout(timer)
    }, [progress, router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 dark:from-slate-900 dark:via-black dark:to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-200/20 dark:border-neutral-800/20 p-8"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                            Setting up your account
                        </h2>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Please wait while we prepare your account
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-8">
                        <div className="relative w-32 h-32">
                            {
                                progress < 100 ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-full"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 rounded-full border-4 border-teal-200 dark:border-teal-800"></div>
                                        </div>
                                        <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600"></div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center"
                                    >
                                        <CheckCircle className="w-16 h-16 text-white" />
                                    </motion.div>
                                )
                            }
                        </div>
                        
                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>{progress}% complete</span>
                                <span>{progress < 100 ? "Please wait..." : "Complete!"}</span>
                            </div>
                            <Progress
                                value={progress}
                                className="h-2"
                            />
                        </div>
                        
                        <div className="text-center">
                            <p className="text-teal-600 dark:text-teal-400 font-medium">{steps[currentStep]}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="absolute -top-4 -left-4"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                <Globe className="w-8 h-8 text-teal-500" />
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="absolute -top-2 -right-4"
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-emerald-500" />
                            </div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="absolute -bottom-4 -left-2"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                                <Mic className="w-5 h-5 text-teal-500" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
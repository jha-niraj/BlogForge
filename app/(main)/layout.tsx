'use client'

import Sidebar from '@/components/mainsidebar';

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<main className="flex-1 overflow-auto ml-0 sm:ml-[90px] pb-16 sm:pb-0">
				{children}
			</main>
		</div>
	);
};

export default Layout;
import Nav from "@/components/nav";
import { UserButton } from "@clerk/nextjs";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<header className="flex relative justify-center">
				<Nav />
				<span className="absolute top-1/2 right-5 -translate-y-1/2">
					<UserButton />
				</span>
			</header>
			<div className="flex-grow mx-auto relative px-4 lg:px-8 w-4/5">
				{children}
			</div>
		</div>
	);
}

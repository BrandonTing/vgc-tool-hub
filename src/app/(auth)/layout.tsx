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
			<header className="flex">
				<Nav />
				<span className="justify-center flex justify-self-end items-center pr-5">
					<UserButton />
				</span>
			</header>
			<div className="flex-grow mx-auto relative px-4 lg:px-8 w-4/5">
				{children}
			</div>
		</div>
	);
}

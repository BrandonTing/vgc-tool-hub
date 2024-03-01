"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Path = {
	label: string;
	url: `/${string}`;
};

function NavLink({
	url,
	isActive,
	label,
}: Path & {
	isActive: boolean;
}) {
	const colorClass = isActive ? "text-blue-600" : "text-gray-900";
	return (
		<Link
			className={cn("hover:text-gray-500", colorClass)}
			href={url}
			data-active={isActive}
		>
			{label}
		</Link>
	);
}

const paths: Array<Path> = [
	{
		label: "Team Check",
		url: "/team-check",
	},
];

export default function Nav() {
	const pathname = usePathname();
	return (
		<nav className="flex gap-2 font-medium w-full py-6 justify-center">
			{paths.map((path) => (
				<NavLink
					key={path.url}
					url={path.url}
					label={path.label}
					isActive={path.url === pathname}
				/>
			))}
		</nav>
	);
}

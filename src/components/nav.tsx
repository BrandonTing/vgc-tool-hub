"use client";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

type Path = {
	label: string;
	url: `/${string}`;
	roles?: Array<string>;
};

function Wrapper({
	children,
	isActive,
	url,
}: { children: ReactNode; isActive: boolean; url: string }) {
	return isActive ? (
		children
	) : (
		<Link href={url} legacyBehavior passHref>
			{children}
		</Link>
	);
}

function NavLink({
	url,
	isActive,
	label,
}: Path & {
	isActive: boolean;
}) {
	const colorClass = isActive ? "text-blue-600" : "text-gray-900";
	return (
		<NavigationMenuItem>
			<Wrapper isActive={isActive} url={url}>
				<NavigationMenuLink
					className={cn(
						"hover:text-gray-500",
						colorClass,
						navigationMenuTriggerStyle(),
					)}
				>
					{label}
				</NavigationMenuLink>
			</Wrapper>
		</NavigationMenuItem>
	);
}

const paths: Array<Path> = [
	{
		label: "隊伍檢測",
		url: "/team-check",
	},
	{
		label: "意見回饋",
		url: "/feedback",
	},
	{
		label: "意見列表",
		url: "/feedback/received",
		roles: ["admin"],
	},
];

const externalPaths = [
	{
		label: "傷害計算",
		url: "https://klay376014.github.io/DamageCalculator/",
		description: "中文化的傷害計算，即將推出新版",
	},
] as const;

export default function Nav() {
	const pathname = usePathname();
	const user = useUser();
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{paths.map((path) => {
					if (
						path.roles &&
						!path.roles.includes(user?.user?.publicMetadata.role as string)
					) {
						return null;
					}
					return (
						<NavLink
							key={path.url}
							url={path.url}
							label={path.label}
							isActive={pathname === path.url}
						/>
					);
				})}
				<NavigationMenuItem>
					<NavigationMenuTrigger>其他工具</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
							{externalPaths.map((path) => (
								<ListItem
									key={path.label}
									title={path.label}
									href={path.url}
									target="_blank"
								>
									{path.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

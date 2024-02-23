/**
 * v0 by Vercel.
 * @see https://v0.dev/t/quTa9OgdWQx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { css } from "@/styled-system/css";
import { headers } from "next/headers";
import Link from "next/link";

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
	return (
		<Link
			className={css({
				color: "gray.900",
				"&:hover": {
					color: "gray.500",
				},
				_active: {
					color: "blue.600",
				},
			})}
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
	const headerList = headers();
	const pathname = headerList.get("next-url") || "";
	return (
		<nav
			// bg-gray-950 w-full py-4 md:py-6
			className={css({
				display: "flex",
				gap: "0.5rem",
				fontWeight: "medium",
				width: "full",
				paddingY: "6",
				justifyContent: "center",
			})}
		>
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

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/quTa9OgdWQx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { css } from "@/styled-system/css";
import Link from "next/link";

export default function Nav() {
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
			<Link
				className={css({
					color: "gray.900",
					"&:hover": {
						color: "gray.500",
					},
				})}
				href="/team-check"
			>
				Team Check
			</Link>
		</nav>
	);
}

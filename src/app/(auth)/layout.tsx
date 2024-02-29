import Nav from "@/components/nav";
import { css } from "@/styled-system/css";
import { container } from "@/styled-system/patterns";
import { UserButton } from "@clerk/nextjs";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className={css({
				display: "flex",
				flexDir: "column",
				height: "full",
			})}
		>
			{/* Header */}
			<header
				className={css({
					display: "flex",
				})}
			>
				<Nav />
				<span
					className={css({
						justifySelf: "end",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						paddingRight: "5",
					})}
				>
					<UserButton />
				</span>
			</header>
			<div
				className={container({
					flexGrow: 1,
				})}
			>
				{children}
			</div>
		</div>
	);
}

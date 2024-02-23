import { css } from "@/styled-system/css";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "VGC Tool Hub",
	description: "Build by Brandon Ting",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className={css({
					height: "full",
				})}
			>
				<body className={inter.className}>
					<Theme
						className={css({
							height: "full",
						})}
					>
						{children}
					</Theme>
				</body>
			</html>
		</ClerkProvider>
	);
}

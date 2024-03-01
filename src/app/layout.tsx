import { cn } from "@/lib/utils";
import JotaiProvider from "@/store/provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "@total-typescript/ts-reset";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const fontSans = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

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
			<html lang="en" className="h-full">
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased",
						fontSans.variable,
					)}
				>
					<JotaiProvider>
						<Theme className="h-full">{children}</Theme>
					</JotaiProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

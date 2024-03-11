import { cn } from "@/lib/utils";
import JotaiProvider from "@/store/provider";
import { ClerkProvider } from "@clerk/nextjs";
import "@total-typescript/ts-reset";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
const fontSans = Inter({
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
	children: ReactNode;
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
						<>
							{children}
							<SpeedInsights />
						</>
					</JotaiProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

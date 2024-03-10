"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";
import { Fragment } from "react";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { genContextForRules } from "@/lib/teamCheck/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const checkResultSchema = z.object({
	paste: z.string().regex(/https:\/\/pokepast.es\/[a-z0-9]{1,}/, {
		message: "格式不符",
	}),
});

export default function SelectedContainer({
	hideRules,
}: { hideRules: () => void }) {
	const [rules, setRules] = useAtom(ruleAtom);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const form = useForm<z.infer<typeof checkResultSchema>>({
		resolver: zodResolver(checkResultSchema),
		defaultValues: {
			paste: searchParams.get("pasteUrl") ?? "",
		},
	});
	const onSubmit = form.handleSubmit(({ paste }) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set("pasteUrl", paste);
		const search = current.toString();
		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
		hideRules();
	});
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>已選擇的規則</CardTitle>
				<CardDescription>目前您所選擇的規則</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-72">
					{rules.length ? (
						<ul>
							{rules.map((rule, i) => {
								const { key, content } = genContextForRules(rule);
								return (
									<Fragment key={key}>
										<li className="flex justify-between">
											{content}
											<Button variant="ghost">
												<Delete
													onClick={() => {
														setRules((prev) => {
															return prev.filter((_, index) => index !== i);
														});
													}}
												/>
											</Button>
										</li>
										<Separator className="my-2" />
									</Fragment>
								);
							})}
						</ul>
					) : (
						<p className=" text-muted-foreground">目前無已選擇條件</p>
					)}
				</ScrollArea>
			</CardContent>
			<CardFooter>
				<Form {...form}>
					<form onSubmit={onSubmit} className="w-full flex justify-end gap-2">
						<FormField
							control={form.control}
							name="paste"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="請提供paste url" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={rules.length === 0}>
							檢查
						</Button>
					</form>
				</Form>
			</CardFooter>
		</Card>
	);
}

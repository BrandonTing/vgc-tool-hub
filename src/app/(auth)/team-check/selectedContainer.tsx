"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Moves } from "@/lib/teamCheck/moves";
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";
import { Fragment } from "react";

export default function SelectedContainer() {
	const [rules] = useAtom(ruleAtom);
	return (
		<Card>
			<CardHeader>
				<CardTitle>已選擇的規則</CardTitle>
				<CardDescription>目前您所選擇的規則</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-80">
					{rules.length ? (
						<ul>
							{rules.map((rule) => {
								let key = "";
								let content = null;
								switch (rule.type) {
									case "hasMove":
										key = rule.move;
										content = (
											<li>隊伍中需含有招式：{Moves[rule.move].name}</li>
										);
										break;
									default:
										content = <li>a rule</li>;
								}
								return (
									<Fragment key={key}>
										{content}
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
		</Card>
	);
}

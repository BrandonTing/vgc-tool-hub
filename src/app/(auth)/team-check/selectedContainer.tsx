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
import { Moves } from "@/lib/teamCheck/moves";
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";
import { useAction } from "next-safe-action/hooks";
import { Fragment } from "react";
import { checkResultAction } from "./actions";

export default function SelectedContainer() {
	const [rules] = useAtom(ruleAtom);
	const { execute, result } = useAction(checkResultAction);
	console.log(result);
	return (
		<Card className="h-full">
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
									case "resistType":
										key = `resistType_${rule.targetType.join(", ")}`;
										content = <li>對{rule.targetType.join(", ")}具有抗性</li>;
										break;
									case "effectiveAgainst":
										key = `effectiveAgainst_${rule.targetType.join(", ")}`;
										content = (
											<li>對{rule.targetType.join(", ")}具有倍率招式</li>
										);
										break;
									case "statAbove":
										key = `statAbove_${rule.key}_${rule.value}`;
										content = (
											<li>
												包含{rule.key}大於{rule.value}的寶可夢
											</li>
										);
										break;
									case "statBelow":
										key = `statBelow_${rule.key}_${rule.value}`;
										content = (
											<li>
												包含{rule.key}小於{rule.value}的寶可夢
											</li>
										);
										break;
									default:
										break;
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
			<CardFooter className="gap-2">
				{result.validationErrors ? (
					<span className="text-red-600">{result.validationErrors.paste}</span>
				) : null}
				<form className="w-full flex justify-end gap-2" action={execute}>
					<Input type="url" name="paste" placeholder="請貼上paste" required />
					<Button type="submit">檢查</Button>
				</form>
			</CardFooter>
		</Card>
	);
}

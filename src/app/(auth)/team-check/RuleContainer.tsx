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
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";
import { MoveRule, ResistTypeRule } from "./rules";

export default function RuleContainer() {
	const [, setRule] = useAtom(ruleAtom);
	return (
		<Card>
			<CardHeader>
				<CardTitle>檢驗規則</CardTitle>
				<CardDescription>
					請選擇您要用來檢驗隊伍之規則，並點擊右側按鈕加入
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-80">
					<ul>
						<li>
							<MoveRule
								addMoveRule={(move) => {
									setRule((prev) => [
										...prev,
										{
											type: "hasMove",
											move,
										},
									]);
								}}
							/>
						</li>
						<Separator className="my-4" />
						<li>
							<ResistTypeRule
								addRule={(targetType) => {
									setRule((prev) => [
										...prev,
										{
											type: "resistType",
											targetType,
										},
									]);
								}}
							/>
						</li>
						<Separator className="my-4" />
						<li>隊伍中具備對特定屬性具備倍率效果之招式</li>
						<Separator className="my-4" />
						<li>隊伍中具備能力值高於特定數值之寶可夢</li>
						<Separator className="my-4" />
						<li>隊伍中具備能力值低於特定數值之寶可夢</li>
						<Separator className="my-4" />
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

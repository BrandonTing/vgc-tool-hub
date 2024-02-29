"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoveRule } from "./Rules";

export default function RuleContainer() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>檢驗規則</CardTitle>
				<CardDescription>
					請選擇您要用來檢驗隊伍之規則，並點擊右側按鈕加入
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul>
					<li>
						<MoveRule />
					</li>
					<Separator className="my-4" />
					<li>隊伍中對於屬性具備抗性</li>
					<Separator className="my-4" />
					<li>隊伍中具備對特定屬性具備倍率效果之招式</li>
					<Separator className="my-4" />
					<li>隊伍中具備能力值高於特定數值之寶可夢</li>
					<Separator className="my-4" />
					<li>隊伍中具備能力值低於特定數值之寶可夢</li>
					<Separator className="my-4" />
				</ul>
			</CardContent>
		</Card>
	);
}

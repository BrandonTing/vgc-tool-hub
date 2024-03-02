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
import {
	EffectiveAgainstTypeRule,
	HasStatRule,
	MoveRule,
	ResistTypeRule,
} from "./rules";

export default function RuleContainer() {
	const [, setRule] = useAtom(ruleAtom);
	return (
		<Card className="h-full">
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
						<Separator className="my-2" />
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
						<Separator className="my-2" />
						<li>
							<EffectiveAgainstTypeRule
								addRule={(targetType) => {
									setRule((prev) => [
										...prev,
										{
											type: "effectiveAgainst",
											targetType,
										},
									]);
								}}
							/>
						</li>
						<Separator className="my-2" />
						<li>
							<HasStatRule
								addRule={(ruleType, statKey, statValue) => {
									setRule((prev) => [
										...prev,
										{
											type: ruleType,
											key: statKey,
											value: statValue,
										},
									]);
								}}
							/>
						</li>
						<Separator className="my-2" />
					</ul>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}

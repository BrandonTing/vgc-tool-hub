"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";

export default function SelectedContainer() {
	const [rules] = useAtom(ruleAtom);
	return (
		<Card>
			<CardHeader>
				<CardTitle>已選擇的規則</CardTitle>
				<CardDescription>目前您所選擇的規則</CardDescription>
			</CardHeader>
			<CardContent>
				{rules.map((rule) => {
					return <p key={rule.type}>{rule.type}</p>;
				})}
			</CardContent>
		</Card>
	);
}

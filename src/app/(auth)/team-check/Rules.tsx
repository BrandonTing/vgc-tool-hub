"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Moves } from "@/lib/teamCheck/moves";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

const moveEntries = Object.entries(Moves);

export function MoveRule({
	addMoveRule,
}: { addMoveRule: (moveName: string) => void }) {
	const [moveKw, setMoveKw] = useState<string>("");
	const [showSelect, setShowSelect] = useState<boolean>(false);
	const moves = useMemo(() => {
		return moveKw.length > 2
			? moveEntries.filter(([key, value]) => {
					const kw = moveKw.toLowerCase();
					return (
						key.toLowerCase().includes(kw) ||
						value.name.toLowerCase().includes(kw)
					);
			  })
			: [];
	}, [moveKw]);
	const canSubmit = useMemo(() => {
		return Boolean(moveEntries.find(([key, _]) => key === moveKw));
	}, [moveKw]);
	return (
		<div className="flex justify-between">
			<div className="flex">
				<span className="align-middle py-2">隊伍具備特定招式：</span>
				<div className="relative">
					<Input
						className="w-60"
						type="text"
						placeholder="請輸入至少三個字母"
						onChange={(e) => {
							setMoveKw(e.target.value);
							setShowSelect(true);
						}}
						value={moveKw}
					/>
					{moves.length > 0 && showSelect ? (
						<div className="absolute w-60 top-full mt-2">
							<ScrollArea className="h-96 w-60">
								<ul className="rounded border  bg-white cursor-pointer">
									{moves.map(([key, move]) => (
										// biome-ignore lint/a11y/useKeyWithClickEvents: TODO not for now
										<li
											key={key}
											className="py-2 px-3 hover:bg-gray-300"
											onClick={() => {
												setMoveKw(key);
												setShowSelect(false);
											}}
										>
											{move.name}
										</li>
									))}
								</ul>
							</ScrollArea>
						</div>
					) : null}
				</div>
			</div>
			<Button
				disabled={!canSubmit}
				onClick={() => {
					addMoveRule(moveKw);
					setMoveKw("");
				}}
			>
				<Plus />
			</Button>
		</div>
	);
}

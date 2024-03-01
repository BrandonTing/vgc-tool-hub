"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PokemonType, Type } from "@/lib/teamCheck/check";
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

export function ResistTypeRule({
	addRule,
}: {
	addRule: (types: PokemonType) => void;
}) {
	const [type1, setType1] = useState<Type | "">("");
	const [type2, setType2] = useState<Type | "">("");

	return (
		<div className="flex justify-between">
			<div className="flex">
				<span className="align-middle py-2">隊伍中對於屬性具備抗性：</span>
				<div className="flex gap-2">
					<TypeSelect placeholder="屬性一" value={type1} onSelect={setType1} />
					<TypeSelect placeholder="屬性二" value={type1} onSelect={setType2} />
				</div>
			</div>
			<Button
				disabled={!type1 && !type2}
				onClick={() => {
					const types: PokemonType = [];
					if (type1) {
						types.push(type1);
					}
					if (type2) {
						types.push(type2);
					}
					addRule(types);
					setType1("");
					setType2("");
				}}
			>
				<Plus />
			</Button>
		</div>
	);
}

function TypeSelect({
	placeholder,
	value,
	onSelect,
}: {
	placeholder: string;
	value?: Type | "";
	onSelect: (type: Type | "") => void;
}) {
	return (
		<Select value={value} onValueChange={onSelect}>
			<SelectTrigger className="w-28">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="Fire">Fire</SelectItem>
				<SelectItem value="Water">Water</SelectItem>
				<SelectItem value="Grass">Grass</SelectItem>
			</SelectContent>
		</Select>
	);
}

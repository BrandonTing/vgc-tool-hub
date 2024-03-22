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
import { PokemonType, StatRule, Type } from "@/lib/teamCheck/check";
import { Moves } from "@/lib/teamCheck/moves";
import { Plus } from "lucide-react";
import { FormEventHandler, ReactNode, useMemo, useState } from "react";
import { statProps, types } from "vgc_data_wrapper";

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
	function setMove(key: string) {
		setMoveKw(key);
		setShowSelect(false);
	}
	return (
		<RuleWrapper
			buttonDisabled={!canSubmit}
			clickHandler={() => {
				addMoveRule(moveKw);
				setMoveKw("");
			}}
		>
			<span className="align-middle py-2">隊伍具備特定招式：</span>
			<div>
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
					<div className="absolute w-60 top-full z-10">
						<ScrollArea className="h-60 w-60 rounded border">
							<ul className=" bg-white cursor-pointer ">
								{moves.map(([key, move]) => (
									<li
										key={key}
										className="py-2 px-3 hover:bg-gray-300"
										onClick={() => setMove(key)}
										onKeyDown={() => setMove(key)}
									>
										{move.name}
									</li>
								))}
							</ul>
						</ScrollArea>
					</div>
				) : null}
			</div>
		</RuleWrapper>
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
		<RuleWrapper
			buttonDisabled={!type1 && !type2}
			clickHandler={() => {
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
			<span className="align-middle py-2">隊伍中對於屬性具備抗性：</span>
			<div className="flex gap-2">
				<TypeSelect placeholder="屬性一" value={type1} onSelect={setType1} />
				<TypeSelect placeholder="屬性二" value={type2} onSelect={setType2} />
			</div>
		</RuleWrapper>
	);
}

export function EffectiveAgainstTypeRule({
	addRule,
}: {
	addRule: (types: PokemonType) => void;
}) {
	const [type1, setType1] = useState<Type | "">("");
	const [type2, setType2] = useState<Type | "">("");

	return (
		<RuleWrapper
			buttonDisabled={!type1 && !type2}
			clickHandler={() => {
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
			<span className="align-middle py-2">隊伍中能克制屬性：</span>
			<div className="flex gap-2">
				<TypeSelect placeholder="屬性一" value={type1} onSelect={setType1} />
				<TypeSelect placeholder="屬性二" value={type2} onSelect={setType2} />
			</div>
		</RuleWrapper>
	);
}

type StatProps = (typeof statProps)[number];

export function HasStatRule({
	addRule,
}: {
	addRule: (type: StatRule, key: StatProps, value: number) => void;
}) {
	const [ruleType, setRuleType] = useState<StatRule>("statAbove");
	const [statKey, setStatKey] = useState<StatProps | "">();
	const [statValue, setStatValue] = useState<number>(0);
	return (
		<RuleWrapper
			buttonDisabled={statValue === 0 || statKey === ""}
			clickHandler={() => {
				if (!statKey) return;
				addRule(ruleType, statKey, statValue);
				setStatValue(0);
				setStatKey("");
				setRuleType("statAbove");
			}}
		>
			<span className="align-middle py-2">成員包含：</span>
			<div className="flex gap-2">
				{/* stat */}
				<div>
					<Select
						value={statKey}
						onValueChange={(val) => {
							setStatKey(val as StatProps);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder="能力值" />
						</SelectTrigger>
						<SelectContent>
							{statProps.map((type) => (
								<SelectItem value={type} key={type}>
									{type}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* type */}
				<Select
					value={ruleType}
					onValueChange={(val) => {
						setRuleType(val as StatRule);
					}}
				>
					<SelectTrigger className="w-20">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="statAbove">大於</SelectItem>
						<SelectItem value="statBelow">小於</SelectItem>
					</SelectContent>
				</Select>
				{/* value */}
				<Input
					className="w-20"
					min={0}
					type="number"
					value={statValue}
					onChange={(e) => {
						setStatValue(+e.target.value);
					}}
				/>
			</div>
		</RuleWrapper>
	);
}

function RuleWrapper({
	children,
	buttonDisabled,
	clickHandler,
}: {
	children: ReactNode;
	buttonDisabled: boolean;
	clickHandler: FormEventHandler<HTMLButtonElement>;
}) {
	return (
		<div className="flex justify-between gap-2 py-2 relative">
			<div className="flex justify-between flex-grow">{children}</div>
			<Button disabled={buttonDisabled} onClick={clickHandler}>
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
			<SelectTrigger className="w-24">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{types.map((type) => (
					<SelectItem key={type} value={type}>
						{type}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { check } from "@/lib/teamCheck/check";
import { genContextForRules, genPasteUrl } from "@/lib/teamCheck/helper";
import { pastesAtom } from "@/store/pokemons";
import { ruleAtom } from "@/store/rules";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { getPokemonsFromPasteUrl } from "vgc_data_wrapper";

export function Result() {
	const pasteID = useSearchParams().get("pasteID");
	const rules = useAtomValue(ruleAtom);
	const [pokemonsFromStore, setPokemons] = useAtom(pastesAtom);

	if (!pasteID || rules.length === 0) return null;
	const pasteUrl = genPasteUrl(pasteID);
	let pokemons = pokemonsFromStore[pasteUrl];
	if (!pokemons) {
		// FIXME too many query times
		pokemons = use(getPokemonsFromPasteUrl(pasteUrl));
		setPokemons({
			...pokemonsFromStore,
			[pasteUrl]: pokemons,
		});
	}
	const checkResults = check(rules, pokemons);
	return (
		<Table>
			<TableCaption>您的隊伍檢驗結果</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">規則</TableHead>
					<TableHead>檢驗結果</TableHead>
					<TableHead>符合之寶可夢</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{checkResults.map((result) => {
					const { key, content } = genContextForRules(result.rule);
					return (
						<TableRow
							key={key}
							className={result.isMatch ? "" : "text-red-600 font-bold"}
						>
							<TableCell className="w-[400px]">{content}</TableCell>
							<TableCell>{result.isMatch ? "符合" : "不符合"}</TableCell>
							<TableCell className="flex justify-start">
								{result.isMatch
									? result.matchedPokemons.map(({ pokemon, underTera }) => {
											return pokemon.sprite ? (
												// TODO display tera
												<div
													key={`${key}_${pokemon.name}_${
														underTera
															? pokemon.teraType
															: pokemon.types.join("_")
													}`}
													className="relative"
												>
													{underTera && (
														<Image
															src="/terastal.webp"
															alt="tera"
															className="absolute -z-10"
															fill={true}
														/>
													)}
													<Image
														width={50}
														height={50}
														alt={pokemon.name || ""}
														src={pokemon.sprite}
													/>
												</div>
											) : (
												pokemon.name
											);
									  })
									: "該找師父了"}
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

"use client";

import { check } from "@/lib/teamCheck/check";
import { genContextForRules } from "@/lib/teamCheck/helper";
import { pastesAtom } from "@/store/pokemons";
import { ruleAtom } from "@/store/rules";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { getPokemonsFromPasteUrl } from "vgc_data_wrapper";

export function Result() {
	const pasteUrl = useSearchParams().get("pasteUrl");
	if (!pasteUrl) return null;
	const [pokemonsFromStore, setPokemons] = useAtom(pastesAtom);
	let pokemons = pokemonsFromStore[pasteUrl];
	if (!pokemons) {
		// FIXME too many query times
		pokemons = use(getPokemonsFromPasteUrl(pasteUrl));
		setPokemons({
			...pokemonsFromStore,
			[pasteUrl]: pokemons,
		});
	}
	const [rules] = useAtom(ruleAtom);
	const checkResults = check(rules, pokemons);
	return (
		<ul>
			{checkResults.map((result, i) => {
				const { key, content } = genContextForRules(rules[i]);
				return (
					<li key={key}>
						{content}
						{result.isMatch ? "符合" : "不符合"}:{" "}
						{result.matchedPokemons.map((mon) => mon.id).join(",")}
					</li>
				);
			})}
		</ul>
	);
}

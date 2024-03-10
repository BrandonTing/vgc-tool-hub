"use client";

import { check } from "@/lib/teamCheck/check";
import { genContextForRules } from "@/lib/teamCheck/helper";
import { pastesAtom } from "@/store/pokemons";
import { ruleAtom } from "@/store/rules";
import { useAtom, useAtomValue } from "jotai";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import { getPokemonsFromPasteUrl } from "vgc_data_wrapper";

export function Result() {
	const pasteUrl = useSearchParams().get("pasteUrl");
	const rules = useAtomValue(ruleAtom);
	const [pokemonsFromStore, setPokemons] = useAtom(pastesAtom);

	if (!pasteUrl || rules.length === 0) return null;
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
		<ul className="text-center">
			{checkResults.map((result, i) => {
				const { key, content } = genContextForRules(rules[i]);
				return (
					<li key={key}>
						{result.isMatch ? "符合" : "不符合"}
						{content}
						<ul className="flex justify-center">
							{result.matchedPokemons.map((mon) => (
								<li key={mon.id}>
									{mon.sprite ? (
										<Image
											width={50}
											height={50}
											alt={mon.name || ""}
											src={mon.sprite}
										/>
									) : (
										mon.name
									)}
								</li>
							))}
						</ul>
					</li>
				);
			})}
		</ul>
	);
}

import { Pokemon, getEffectivenessOnPokemon } from "vgc_data_wrapper";
import { Moves } from "./moves";

export type MoveList = Record<
	string,
	{ type: string; basePower: number; category: string; name: string }
>;

export type Type = Pokemon["types"][number];
type StatKey = keyof (Pokemon["stats"] & {});

type PokemonType = Array<Type>;

type StatInput = {
	key: StatKey;
	value: number;
};

export type CheckRule =
	| {
			type: "hasMove";
			move: string;
	  }
	| {
			type: "resistType";
			targetType: PokemonType;
	  }
	| {
			type: "effectiveAgainst";
			targetType: PokemonType;
	  }
	| ({
			type: "statAbove";
	  } & StatInput)
	| ({
			type: "statBelow";
	  } & StatInput);

type CheckResult = {
	isMatch: boolean;
	matchedPokemons: Array<Pokemon>;
};

export function check(
	rules: Array<CheckRule>,
	pokemons: Array<Pokemon>,
): Array<CheckResult> {
	return rules
		.map((rule) => {
			switch (rule.type) {
				case "hasMove":
					return checkHasMove(pokemons, rule.move);
				case "effectiveAgainst":
					return checkHasEffectiveMoveAgainstType(pokemons, rule.targetType);
				case "resistType":
					return checkHasResistAgainstMoveType(pokemons, rule.targetType);
				case "statAbove":
					return checkHasStatAbove(pokemons, rule.key, rule.value);
				case "statBelow":
					return checkHasStatBelow(pokemons, rule.key, rule.value);
				default:
					return;
			}
		})
		.filter(Boolean);
}

function checkHasMove(pokemons: Array<Pokemon>, move: string): CheckResult {
	function helper(pokemon: Pokemon): boolean {
		return Boolean(pokemon.moves?.includes(move));
	}

	return loopPokemonsHelper(pokemons, helper);
}

function checkHasResistAgainstMoveType(
	pokemons: Array<Pokemon>,
	moveType: PokemonType,
): CheckResult {
	function helper(pokemon: Pokemon): boolean {
		let effectiveness = 1;
		for (const type of moveType) {
			effectiveness =
				effectiveness * getEffectivenessOnPokemon(type, pokemon.types);
		}
		return effectiveness < 1;
	}

	return loopPokemonsHelper(pokemons, helper);
}

function checkHasEffectiveMoveAgainstType(
	pokemons: Array<Pokemon>,
	targetType: PokemonType,
): CheckResult {
	function helper(pokemon: Pokemon): boolean {
		if (!pokemon.moves) return false;
		for (const move of pokemon.moves) {
			if (!Moves[move]) continue;
			if (Moves[move].category === "Status") continue;
			const effectiveness = getEffectivenessOnPokemon(
				Moves[move].type as Type,
				targetType,
			);
			if (effectiveness > 1) return true;
		}
		return false;
	}
	return loopPokemonsHelper(pokemons, helper);
}

function checkHasStatAbove(
	pokemons: Array<Pokemon>,
	key: StatInput["key"],
	value: StatInput["value"],
): CheckResult {
	function helper(pokemon: Pokemon): boolean {
		return pokemon.getStat(key) > value;
	}
	return loopPokemonsHelper(pokemons, helper);
}

function checkHasStatBelow(
	pokemons: Array<Pokemon>,
	key: StatInput["key"],
	value: StatInput["value"],
): CheckResult {
	function helper(pokemon: Pokemon): boolean {
		return pokemon.getStat(key) < value;
	}
	return loopPokemonsHelper(pokemons, helper);
}

function loopPokemonsHelper(
	pokemons: Array<Pokemon>,
	cb: (pokemon: Pokemon) => boolean,
): CheckResult {
	const matched = [];
	for (const pokemon of pokemons) {
		const match = cb(pokemon);
		if (match) {
			matched.push(pokemon);
		}
	}
	return {
		isMatch: matched.length > 0,
		matchedPokemons: matched,
	};
}

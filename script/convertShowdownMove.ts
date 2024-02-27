import { Moves } from "./sdMoves";
const converted = Object.entries(Moves).reduce(
	(pre, [key, val]) => {
		pre[key] = {
			type: val.type,
			basePower: val.basePower,
			category: val.category,
		};
		return pre;
	},
	{} as Record<string, { type: string; basePower: number; category: string }>,
);
Bun.write(
	"./src/lib/teamcheck/moves.ts",
	`export const Moves: Record<string, {type: string, basePower: number, category: string}> = ${Bun.inspect(
		converted,
	)}`,
);

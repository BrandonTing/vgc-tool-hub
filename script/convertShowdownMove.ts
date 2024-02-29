import { Moves } from "./sdMoves";
const converted = Object.entries(Moves).reduce(
	(pre, [key, val]) => {
		pre[key] = {
			type: val.type,
			basePower: val.basePower,
			category: val.category,
			name: val.name,
		};
		return pre;
	},
	{} as Record<
		string,
		{ type: string; basePower: number; category: string; name: string }
	>,
);
Bun.write(
	"./src/lib/teamcheck/moves.ts",
	`import { MoveList } from "./check";

	export const Moves: MoveList = ${Bun.inspect(converted)}`,
);

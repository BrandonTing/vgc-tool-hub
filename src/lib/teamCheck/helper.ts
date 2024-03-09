import { CheckRule } from "./check";
import { Moves } from "./moves";

export function genContextForRules(rule: CheckRule): {
	key: string;
	content: string;
} {
	let key = "";
	let content = "";
	switch (rule.type) {
		case "hasMove":
			key = rule.move;
			content = `隊伍中需含有招式：${Moves[rule.move].name}`;
			break;
		case "resistType":
			key = `resistType_${rule.targetType.join(", ")}`;
			content = `對${rule.targetType.join(", ")}具有抗性`;
			break;
		case "effectiveAgainst":
			key = `effectiveAgainst_${rule.targetType.join(", ")}`;
			content = `對${rule.targetType.join(", ")}具有倍率招式`;
			break;
		case "statAbove":
			key = `statAbove_${rule.key}_${rule.value}`;
			content = `包含${rule.key}大於${rule.value}的寶可夢`;
			break;
		case "statBelow":
			key = `statBelow_${rule.key}_${rule.value}`;
			content = `包含${rule.key}小於${rule.value}的寶可夢`;
			break;
		default:
			break;
	}
	return { key, content };
}

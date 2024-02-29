import { css } from "@/styled-system/css";
import RuleSeperator from "./RuleSeperator";
import { MoveRule } from "./Rules";

const innerBoxCss = css({
	flexGrow: 1,
});

export default function Home() {
	return (
		<div
			className={css({
				display: "flex",
				borderColor: "gray.400",
				borderWidth: "thin",
				borderRadius: "sm",
				minWidth: "6xl",
				paddingX: "4",
				paddingY: "2",
			})}
		>
			{/* Rules */}
			<div className={innerBoxCss}>
				Rules
				<ul>
					<li>
						<MoveRule />
					</li>
					<RuleSeperator />
					<li>隊伍中對於屬性具備抗性</li>
					<RuleSeperator />
					<li>隊伍中具備對特定屬性具備倍率效果之招式</li>
					<RuleSeperator />
					<li>隊伍中具備能力值高於特定數值之寶可夢</li>
					<RuleSeperator />
					<li>隊伍中具備能力值低於特定數值之寶可夢</li>
					<RuleSeperator />
				</ul>
			</div>
			{/* Selected Rules */}
			<div className={innerBoxCss}>Selected</div>
		</div>
	);
}

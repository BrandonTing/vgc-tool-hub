import RuleContainer from "./ruleContainer";
import SelectedContainer from "./selectedContainer";

export default function Page() {
	return (
		<div className="flex gap-2 w-full h-[500px]">
			{/* Rules */}
			<div className="w-1/2 f-ull">
				<RuleContainer />
			</div>
			{/* Selected Rules */}
			<div className="w-1/2 h-full">
				<SelectedContainer />
			</div>
		</div>
	);
}

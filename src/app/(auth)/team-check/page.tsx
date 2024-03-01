import RuleContainer from "./ruleContainer";
import SelectedContainer from "./selectedContainer";

export default function Home() {
	return (
		<div className="flex gap-2 w-full">
			{/* Rules */}
			<div className="w-1/2">
				<RuleContainer />
			</div>
			{/* Selected Rules */}
			<div className="w-1/2">
				<SelectedContainer />
			</div>
		</div>
	);
}

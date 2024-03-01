import RuleContainer from "./ruleContainer";
import SelectedContainer from "./selectedContainer";

export default function Home() {
	return (
		<div className="flex gap-2 w-full">
			{/* Rules */}
			<div className="flex-grow">
				<RuleContainer />
			</div>
			{/* Selected Rules */}
			<div className="flex-grow">
				<SelectedContainer />
			</div>
		</div>
	);
}

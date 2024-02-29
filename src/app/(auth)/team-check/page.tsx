import RuleContainer from "./RuleContainer";

export default function Home() {
	return (
		<div className="flex gap-2 w-full">
			{/* Rules */}
			<div className="flex-grow">
				<RuleContainer />
			</div>
			{/* Selected Rules */}
			<div className="flex-grow">Selected</div>
		</div>
	);
}

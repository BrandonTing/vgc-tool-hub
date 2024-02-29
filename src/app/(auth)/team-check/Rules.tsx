"use client";

import { Moves } from "@/lib/teamCheck/moves";
import { Select } from "@radix-ui/themes";

export function MoveRule() {
	return (
		<>
			隊伍中含有
			<Select.Root>
				<Select.Trigger placeholder="請選擇招式" />
				<Select.Content>
					{/* use combobox */}
					{Object.entries(Moves).map(([move, value]) => {
						return (
							<Select.Item key={move} value={move}>
								{value.name}
							</Select.Item>
						);
					})}
				</Select.Content>
			</Select.Root>
		</>
	);
}

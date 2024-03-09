"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SelectedContainer from "./selectedContainer";
import UnSelectedContainer from "./unSelectedContainer";

export default function RulesContainer() {
	const qs = useSearchParams();
	const [isOpen, setIsOpen] = useState(() => !qs.get("pasteUrl"));
	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
			<div className="flex items-center justify-end space-x-4 px-4">
				<h4 className="text-sm font-semibold">檢驗規則</h4>
				<CollapsibleTrigger asChild>
					<Button variant="ghost" size="sm">
						{isOpen ? <ChevronsDownUp /> : <ChevronsUpDown />}
						<span className="sr-only">Toggle</span>
					</Button>
				</CollapsibleTrigger>
			</div>
			<div className=" flex gap-2">
				{/* Rules */}
				<CollapsibleContent className="w-1/2 f-ull">
					<UnSelectedContainer />
				</CollapsibleContent>
				{/* Selected Rules */}
				<CollapsibleContent className="w-1/2 f-ull">
					<SelectedContainer hideRules={() => setIsOpen(false)} />
				</CollapsibleContent>
			</div>
		</Collapsible>
	);
}

"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MoveList } from "@/lib/teamCheck/check";
import { Moves } from "@/lib/teamCheck/moves";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

const moveEntries = Object.entries(Moves);

export function MoveRule() {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");
	const [entries, setEntries] = useState<Array<[string, MoveList[string]]>>(
		moveEntries.slice(0, 50),
	);
	const [scroller, setScroller] = useState<HTMLDivElement>();
	const [observing, setObserving] = useState<boolean>(false);
	const scrollerRefCallback = useCallback((node: HTMLDivElement) => {
		if (node !== null) {
			setScroller(node);
		}
	}, []);

	const refCallback = useCallback(
		(node: HTMLDivElement) => {
			if (node !== null && !observing) {
				const intersectionObserver = new IntersectionObserver(
					(list) => {
						if (list[0].intersectionRatio <= 0) return;
						setEntries(moveEntries.slice(0, 100));
						intersectionObserver.unobserve(node);
					},
					{
						root: scroller,
					},
				);
				intersectionObserver.observe(node);
				setObserving(true);
			}
		},
		[scroller, observing],
	);
	return (
		<>
			隊伍具備特定招式：
			<Popover open={open} onOpenChange={setOpen} modal={true}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{value
							? entries.find(([key, _]) => key === value)?.[1].name
							: "請選擇招式"}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" ref={scrollerRefCallback}>
					<Command>
						<CommandInput placeholder="查詢招式..." />
						<ScrollArea className="h-96 overflow-y-auto ">
							<CommandEmpty>找不到指定招式</CommandEmpty>
							<CommandGroup>
								{entries.map(([moveKey, move]) => (
									<CommandItem
										key={moveKey}
										value={moveKey}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												value === moveKey ? "opacity-100" : "opacity-0",
											)}
										/>
										{move.name}
									</CommandItem>
								))}
								<div ref={refCallback} />
							</CommandGroup>
						</ScrollArea>
					</Command>
				</PopoverContent>
			</Popover>
		</>
	);
}

import { CheckRule } from "@/lib/teamCheck/check";
import { atom } from "jotai";

export const ruleAtom = atom<Array<CheckRule>>([]);

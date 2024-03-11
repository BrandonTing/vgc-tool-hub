import { CheckRule } from "@/lib/teamCheck/check";
// import { atomWithLocalStorage } from "./helper";
import { atomWithStorage } from "jotai/utils";

export const ruleAtom = atomWithStorage<Array<CheckRule>>("rules", []);

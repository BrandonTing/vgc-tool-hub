import { atom } from "jotai";
import type { Pokemon } from "vgc_data_wrapper";

export const pastesAtom = atom<Record<string, Array<Pokemon>>>({});

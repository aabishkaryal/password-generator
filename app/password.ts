import { GetRandomInt } from "@app/utils";
import {
	ALPHABETS,
	NUMBERS,
	SPECIAL_CHARS,
	AMBIGIOUS_CHARS,
} from "@app/constants";

export type GeneratorParams = {
	numLetters: number;
	numNumbers?: number;
	numSpecialChars?: number;
	isAmbigious?: boolean;
};

export function GeneratePassword({
	numLetters = 8,
	numNumbers = 0,
	numSpecialChars = 0,
	isAmbigious = false,
}: GeneratorParams): string {
	const randomLetters = GetRandomChars(ALPHABETS, numLetters).split("");
	const randomNumbers = GetRandomChars(NUMBERS, numNumbers).split("");
	const randomSpecialChars = GetRandomChars(SPECIAL_CHARS + isAmbigious ? AMBIGIOUS_CHARS : "", numSpecialChars).split("");
	const result = [...randomLetters, ...randomNumbers, ...randomSpecialChars]
	result.sort(() => 0.5 - Math.random());
	return result.join("");
}

// Given an string and a number return a new string with n random characters (repition allowed)
export function GetRandomChars(str: string, n: number): string {
	const chars = [];
	
	for (let i = 0; i < n; i++) {
		const randomIndex = GetRandomInt(0, str.length);
		chars.push(str[randomIndex]);
	}
	
	return chars.join("");
}

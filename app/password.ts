import { GetRandomInt } from "@app/utils";
import {
	LOWERCASE_ALPHABETS,
	UPPERCASE_ALPHABETS,
	NUMBERS,
	SPECIAL_CHARS,
	AMBIGIOUS_CHARS,
} from "./constants";

export type GeneratorParams = {
	numLetters: number;
	numNumbers?: number;
	numSpecialChars?: number;
	ambigious?: boolean;
};

export function GeneratePassword({
	numLetters = 8,
	numNumbers = 0,
	numSpecialChars = 0,
	ambigious = false,
}: GeneratorParams): string {
	const chars = [];
	const letters = LOWERCASE_ALPHABETS + UPPERCASE_ALPHABETS;
	while (numLetters + numNumbers + numSpecialChars > 0) {
		const searchSpace =
			(numLetters > 0 ? letters : "") +
			(numNumbers > 0 ? NUMBERS : "") +
			(numSpecialChars > 0 ? SPECIAL_CHARS : "") +
			(numSpecialChars > 0 && ambigious ? AMBIGIOUS_CHARS : "");
		const char = searchSpace[GetRandomInt(0, searchSpace.length - 1)];
		chars.push(char);
		if (letters.indexOf(char) >= 0) numLetters--;
		if (NUMBERS.indexOf(char) >= 0) numNumbers--;
		if (
			SPECIAL_CHARS.indexOf(char) >= 0 ||
			(ambigious && AMBIGIOUS_CHARS.indexOf(char) >= 0)
		)
			numSpecialChars--;
	}
	chars.sort(() => 0.5 - Math.random());
	return chars.join("");
}

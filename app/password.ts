import { GetRandomInt } from "@app/utils";
import {
    ALPHABETS,
    NUMBERS,
    SPECIAL_CHARS,
    AMBIGIOUS_CHARS,
} from "@app/constants";

export type GeneratorParams = {
    numLetters: number;
    numNumbers: number;
    numSpecialChars: number;
    isAmbigious: boolean;
};

export function GeneratePassword({
    numLetters,
    numNumbers,
    numSpecialChars,
    isAmbigious,
}: GeneratorParams): string {
    const randomLetters = GetRandomChars(ALPHABETS, numLetters).split("");
    const randomNumbers = GetRandomChars(NUMBERS, numNumbers).split("");
    const specialChars = SPECIAL_CHARS.concat(
        isAmbigious ? AMBIGIOUS_CHARS : ""
    );
    const randomSpecialChars = GetRandomChars(
        specialChars,
        numSpecialChars
    ).split("");
    const result = [...randomLetters, ...randomNumbers, ...randomSpecialChars];
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

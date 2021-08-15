// Generates random integer between min and max [min, max).
export function GetRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

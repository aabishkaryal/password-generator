import React, { useState } from "react";

import {
	ChakraComponent,
	VStack,
	HStack,
	Input,
	InputRightElement,
	Icon,
	Button,
	Text,
	useClipboard,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	Tooltip,
	InputGroup,
	Checkbox,
	Switch,
} from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { FaSyncAlt, FaClipboardCheck, FaClipboard } from "react-icons/fa";

import {
	AMBIGIOUS_CHARS,
	ICON_SIZE_SM,
	LOWERCASE_ALPHABETS,
	NUMBERS,
	SPECIAL_CHARS,
	UPPERCASE_ALPHABETS,
} from "@app/constants";
import { GeneratePassword } from "@app/password";

export const Generator: ChakraComponent<"div", {}> = () => {
	const [numLetters, changeNumLetters] = useState(8);
	const [numNumbers, changeNumNumbers] = useState(2);
	const [numSpecialChars, changeNumSpecialChars] = useState(2);
	const [ambigious, changeHasAmbigious] = useState(false);
	const [password, updatePassword] = useState(
		GeneratePassword({
			numLetters,
			numNumbers,
			numSpecialChars,
			ambigious,
		})
	);

	const updateNumLetters = async (numLetters: number) => {
		changeNumLetters(numLetters);
		const password = GeneratePassword({
			numLetters,
			numNumbers,
			numSpecialChars,
			ambigious,
		});
		updatePassword(password);
	};

	const updateNumNumbers = async (numNumbers: number) => {
		changeNumNumbers(numNumbers);
		const password = GeneratePassword({
			numLetters,
			numNumbers,
			numSpecialChars,
			ambigious,
		});
		updatePassword(password);
	};

	const updateNumSpecialChars = async (numSpecialChars: number) => {
		changeNumSpecialChars(numSpecialChars);
		const password = GeneratePassword({
			numLetters,
			numNumbers,
			numSpecialChars,
			ambigious,
		});
		updatePassword(password);
	};

	const updateAmbigious = async (ambigous: boolean) => {
		changeHasAmbigious(ambigous);
		const password = GeneratePassword({
			numLetters,
			numNumbers,
			numSpecialChars,
			ambigious,
		});
		updatePassword(password);
	};

	const { onCopy, hasCopied } = useClipboard(password);
	return (
		<VStack
			spacing={6}
			marginX={4}
			id="generator"
			marginTop={{ base: 8 }}
			w={{ base: "80%", md: "65%", lg: "50%" }}
		>
			<HStack
				justifyContent="space-between"
				padding={4}
				spacing={6}
				width="100%"
				id="display"
			>
				<InputGroup>
					<Input
						isReadOnly
						variant="outline"
						value={password}
						isTruncated
					/>
					<InputRightElement
						cursor="pointer"
						onClick={() => {
							updatePassword(
								GeneratePassword({
									numLetters,
									numNumbers,
									numSpecialChars,
								})
							);
						}}
					>
						<Icon boxSize={ICON_SIZE_SM} as={FaSyncAlt} />
					</InputRightElement>
				</InputGroup>
				<Button backgroundColor="transparent" onClick={onCopy}>
					<HStack spacing={2} padding={4}>
						<Icon
							as={hasCopied ? FaClipboardCheck : FaClipboard}
							boxSize={ICON_SIZE_SM}
						/>
						<Text fontSize="md">
							{hasCopied ? "Copied" : "Copy"}
						</Text>
					</HStack>
				</Button>
			</HStack>
			<GeneratorSetting
				value={numLetters}
				onChange={updateNumLetters}
				label="Letters"
				tooltipLabel={LOWERCASE_ALPHABETS + UPPERCASE_ALPHABETS}
			/>
			<GeneratorSetting
				value={numNumbers}
				onChange={updateNumNumbers}
				label="Numbers"
				tooltipLabel={NUMBERS}
			/>
			<GeneratorSetting
				value={numSpecialChars}
				onChange={updateNumSpecialChars}
				label="Special Characters"
				tooltipLabel={SPECIAL_CHARS}
			/>
			<AmbigiousChar
				ambigious={ambigious}
				updateAmbigious={updateAmbigious}
			/>
		</VStack>
	);
};

function AmbigiousChar({
	ambigious,
	updateAmbigious,
}: {
	ambigious: boolean;
	updateAmbigious: (ambigious: boolean) => void;
}): JSX.Element {
	const label = "Ambigious Characters";
	return (
		<HStack id="ambigiousCharacters" spacing={4} alignSelf="flex-start">
			<HStack spacing={2}>
				<Text>{label}</Text>
				<Tooltip label={AMBIGIOUS_CHARS} aria-label={AMBIGIOUS_CHARS}>
					<QuestionIcon boxSize={ICON_SIZE_SM} />
				</Tooltip>
			</HStack>
			<Switch
				defaultChecked={ambigious}
				onChange={(event) => updateAmbigious(event.target.checked)}
			/>
		</HStack>
	);
}

type GeneratorSettingProps = {
	value: number;
	onChange: (value: number) => void;
	label: string;
	tooltipLabel: string;
	min?: number;
	max?: number;
};

const GeneratorSetting: ChakraComponent<"div", GeneratorSettingProps> = ({
	value,
	onChange,
	label,
	tooltipLabel,
	min = 0,
	max = 20,
}) => {
	return (
		<HStack id="generatorSettings" spacing={4} width="100%">
			<HStack spacing={2}>
				<Text>{label}</Text>
				<Tooltip label={tooltipLabel} aria-label={tooltipLabel}>
					<QuestionIcon boxSize={ICON_SIZE_SM} />
				</Tooltip>
			</HStack>
			<Slider
				value={value}
				min={min}
				max={max}
				onChange={onChange}
				aria-label={label}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Input isReadOnly value={value} width="75px" />
		</HStack>
	);
};

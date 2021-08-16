import { ICON_SIZE_SM } from "@app/constants";
import { GeneratePassword } from "@app/password";
import {
	ChakraComponent,
	VStack,
	HStack,
	InputGroup,
	Input,
	InputRightElement,
	Icon,
	Button,
	Text,
	useClipboard,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSyncAlt, FaClipboardCheck, FaClipboard } from "react-icons/fa";

export const Generator: ChakraComponent<"div", {}> = () => {
	const [numLetters, updateNumLetters] = useState(8);
	const [numNumbers, updateNumNumbers] = useState(2);
	const [numSpecialChars, updateNumSpecialChars] = useState(2);
	const [hasAmbigious, changeHasAmbigious] = useState(false);
	const [password, updatePassword] = useState(
		GeneratePassword({ numLetters, numNumbers, numSpecialChars })
	);

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
						children={
							<Icon boxSize={ICON_SIZE_SM} as={FaSyncAlt} />
						}
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
					/>
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
		</VStack>
	);
};

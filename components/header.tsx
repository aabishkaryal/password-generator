import React from "react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
	ChakraComponent,
	Heading,
	HStack,
	Icon,
	IconButton,
	Link,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";

import { FaCode } from "react-icons/fa";

import { ICON_SIZE } from "@app/constants";

export const Header: ChakraComponent<"div", {}> = () => {
	const { toggleColorMode } = useColorMode();
	return (
		<HStack
			id="header"
			justifyContent="space-between"
			paddingY={4}
			paddingX={{ base: 4, md: 8 }}
			boxShadow="lg"
		>
			<Heading as="h1" fontSize={{ base: "xl", md: "3xl" }}>
				Password Manager
			</Heading>
			<HStack spacing={4}>
				<IconButton
					aria-label="Switch between dark and light mode"
					icon={useColorModeValue(
						<MoonIcon boxSize={ICON_SIZE} />,
						<SunIcon boxSize={ICON_SIZE} />
					)}
					backgroundColor="transparent"
					onClick={toggleColorMode}
					isRound
				/>
				<Link
					isExternal
					cursor="pointer"
					href="https://github.com/aabishkaryal/password-manager"
				>
					<Icon as={FaCode} boxSize={ICON_SIZE} />
				</Link>
			</HStack>
		</HStack>
	);
};

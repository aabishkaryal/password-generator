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

import { FaGithub } from "react-icons/fa";

export const Header: ChakraComponent<"div", {}> = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <HStack
            id="header"
            justifyContent="space-between"
            paddingY={4}
            paddingX={{ base: 4, md: 8 }}
            boxShadow="lg"
            width="100%"
        >
            <Heading as="h1" fontSize={{ base: "xl", md: "3xl" }} isTruncated>
                Password Manager
            </Heading>
            <HStack spacing={2}>
                <IconButton
                    aria-label="Switch between dark and light mode"
                    size="md"
                    icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
                    backgroundColor="transparent"
                    onClick={toggleColorMode}
                    isRound
                />

                <IconButton
                    aria-label="Link to Github repository."
                    size="md"
                    backgroundColor="transparent"
                    icon={<Icon as={FaGithub} />}
                    as={Link}
                    href="https://github.com/aabishkaryal/password-manager"
                    isRound
                    isExternal
                />
            </HStack>
        </HStack>
    );
};

import React from "react";

import "focus-visible/dist/focus-visible";

import type { NextPage } from "next";
import Head from "next/head";

import {
  Heading,
  HStack,
  LinkOverlay,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
  Icon,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { FaGithub } from "react-icons/fa";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Head>
        <title>Password Manager</title>
      </Head>
      <HStack
        id="header"
        justifyContent="space-between"
        paddingY={4}
        paddingX={{ base: 4, md: 8 }}
        boxShadow="lg"
      >
        <Heading>Password Manager</Heading>

        <HStack spacing={4}>
          <IconButton
            aria-label="Switch between dark and light mode"
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
            backgroundColor="transparent"
            onClick={toggleColorMode}
          />
          <Link
            isExternal
            cursor="pointer"
            href="https://github.com/aabishkaryal/password-manager"
          >
            <Icon as={FaGithub} />
          </Link>
        </HStack>
      </HStack>
    </>
  );
};

export default Home;

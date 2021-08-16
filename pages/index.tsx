import React from "react";

import "focus-visible/dist/focus-visible";

import type { NextPage } from "next";
import Head from "next/head";

import { Header } from "@components/header";
import { Generator } from "@components/generator";
import { Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
	return (
		<Flex
			alignItems="center"
			direction="column"
			width="100%"
			minWidth="300px"
		>
			<Head>
				<title>Password Manager</title>
			</Head>
			<Header />
			<Generator />
		</Flex>
	);
};

export default Home;

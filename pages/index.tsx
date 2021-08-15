import React from "react";

import "focus-visible/dist/focus-visible";

import type { NextPage } from "next";
import Head from "next/head";

import { useClipboard } from "@chakra-ui/react";

import { Header } from "@components/header";
import { Generator } from "@components/generator";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Password Manager</title>
			</Head>
			<Header />
			<Generator />
		</>
	);
};

export default Home;

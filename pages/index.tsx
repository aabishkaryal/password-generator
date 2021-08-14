import React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Password Manager</title>
      </Head>
      <Box>Hello, World!</Box>
    </>
  );
};

export default Home;

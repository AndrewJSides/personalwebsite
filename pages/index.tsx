import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import React, { useEffect } from "react";
import MenuBarContainer from "../components/MenuBar/MenuBarContainer";
import About from "../components/About";
import Router from "next/router";

const inter = Inter({ subsets: ["latin"] });

// useEffect to push the route /about

export default function Home() {
  useEffect(() => {
    Router.push("/about");
  }, []);

  return (
    <>
      <Head>
        <title>Andrew Sides</title>
        <meta name="description" content="Personal webpage of Andrew Sides" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <MenuBarContainer /> */}
      <About />
    </>
  );
}

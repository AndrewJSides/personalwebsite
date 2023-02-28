import React from "react";
import Head from "next/head";

import About from "../components/About";
const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Andrew Sides</title>
        <meta
          name="description"
          content="Currently a Software Engineer, this is my personal webpage."
        />
      </Head>
      <About />
    </>
  );
};

export default AboutPage;

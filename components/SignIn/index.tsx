import Head from "next/head";
import { Fragment, FunctionComponent } from "react";

import Header from "../Header";
import Hero from "../Hero";

const SignIn: FunctionComponent = () => {
  return (
    <Fragment>
      <Head>
        <title>NextTodos | Sign In</title>
      </Head>
      <Header />
      <main className="w-full">
        <Hero />
      </main>
    </Fragment>
  );
};

export default SignIn;

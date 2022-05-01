import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Home, SignIn } from "../components";

const Root: NextPage = () => {
  const { data: session } = useSession();
  return session ? <Home /> : <SignIn />;
};

export default Root;

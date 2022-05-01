import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  const { data: session } = useSession();
  return (
    <header className="fixed top-0 w-full bg-gray-700 p-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-3xl text-white">
          <Link href="/">NextTodos</Link>
        </h1>
        <nav className="flex flex-row items-center justify-between gap-7">
          <ul className="flex flex-row gap-5">
            <li className="text-white hover:underline hover:underline-offset-4">
              <Link href="/">Home</Link>
            </li>
            {session && (
              <li className="text-white hover:underline hover:underline-offset-4">
                <Link href="/todos">My todos</Link>
              </li>
            )}
            <li className="text-white hover:underline hover:underline-offset-4">
              <Link href="/about-us">About Us</Link>
            </li>
          </ul>
          <div className="">
            {session ? (
              <div className="group relative flex cursor-pointer flex-row gap-2 rounded-md bg-slate-600 p-2 text-lg font-bold text-white">
                <Image
                  src={session.user?.image || ""}
                  alt={session.user?.name || ""}
                  width={32}
                  height={32}
                  className="rounded-full"
                ></Image>
                <span>{session.user?.name}</span>
                <ul className="absolute top-0 -left-1 hidden w-full rounded-md bg-white text-center transition-all duration-700 group-hover:top-12 group-hover:flex group-hover:flex-col">
                  <li
                    className="capitalize text-black"
                    onClick={() => signOut()}
                  >
                    sign out
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="rounded-md bg-blue-600 p-2 capitalize text-white"
                onClick={() => signIn()}
              >
                sign in
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

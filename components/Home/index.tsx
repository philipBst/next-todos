import Head from "next/head";
import Header from "../Header";
import { useQuery } from "react-query";
import Hero from "../Hero";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
}

const Home = () => {
  const { data } = useQuery("users", fetchUsers);
  console.log(data);
  return (
    <>
      <Head>
        <title>NextTodos | Home</title>
      </Head>
      <Header />
      <main className="p-16">
        <Hero />
      </main>
    </>
  );
};

export default Home;

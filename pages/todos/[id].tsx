import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Todo = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  if (session) {
    console.log(params?.id);
  }
  return {
    props: {},
  };
};

export default Todo;

import Head from "next/head";
import React from "react";

import { isAxiosError } from "axios";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { CreateEditPost } from "../components/sections/create-post/CreateEditPost";

function Create() {
  return (
    <>
      <Head>
        <title>Create a post</title>
      </Head>
      <CreateEditPost title={"Create"} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email && data.role === "Admin") {
          store.dispatch(setUserData(data));
        }
      } else {
        return {
          props: {},
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
      return {
        props: {},
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
);

export default Create;

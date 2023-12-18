import Head from "next/head";
import React from "react";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { isAxiosError } from "axios";
import HeroForm from "../components/sections/hero/HeroForm";
import { RegisterFormPg } from "../components/common/auth-forms/forms/RegisterFormPg";

function Login() {
  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <HeroForm>
        <RegisterFormPg typeDB={"pg"} single={true} typeView={"page"} />
      </HeroForm>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email) {
          store.dispatch(setUserData(data));
          return {
            props: {},
            redirect: {
              destination: "/profile",
              permanent: false,
            },
          };
        }
      }
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
    }
    return {
      props: {},
    };
  }
);

export default Login;

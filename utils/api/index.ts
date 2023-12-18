import Cookies, { parseCookies } from "nookies";
import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext, NextPageContext } from "next";
import { UserApi } from "./user";
import { PostApi } from "./post";
import { PaymentApi } from "./payment";

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>;
  // server: ReturnType<typeof ServerApi>;
  // service: ReturnType<typeof ServiceApi>;
  post: ReturnType<typeof PostApi>;
  payment: ReturnType<typeof PaymentApi>;
  // comment: ReturnType<typeof CommentApi>;
};

export const Api = (
  ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const aToken = cookies.Authentication;
  const rToken = cookies.Refresh;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    withCredentials: true,
    headers: {
      ...(aToken && { Cookie: "Authentication=" + aToken }),
      // "Content-Type": "application/json",
      // ...(rToken && { Cookie: "Refresh=" + rToken }),
      // [aToken && "Cookie"]: "Authentication=" + aToken,
      // [rToken && "Cookie"]: "Refresh=" + rToken,
      // Cookie: "Authentication=" + aToken,
    },
  });

  const apis = {
    user: UserApi,
    // server: ServerApi,
    // service: ServiceApi,
    post: PostApi,
    payment: PaymentApi,
    // comment: CommentApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};

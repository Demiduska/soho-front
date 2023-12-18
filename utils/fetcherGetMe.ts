import { Fetcher } from "swr";
import { Api } from "./api";
import { ResponseUser } from "./api/types";

export const fetcherGetMe: Fetcher<ResponseUser, string> = (params) =>
  Api().user.getMe();

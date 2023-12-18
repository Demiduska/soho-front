import { Fetcher } from "swr";
import { Api } from "./api";
import { GetPostDto, ResponseCreatePost, ResponsePosts } from "./api/types";

export const fetcher: Fetcher<ResponsePosts, GetPostDto> = (params) =>
  Api().post.getPosts(params);

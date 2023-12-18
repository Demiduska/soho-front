import { AxiosInstance } from "axios";
import {
  CreatePostDto,
  GetPostDto,
  ResponseCreatePost,
  ResponsePosts,
  UpdatePostDto,
} from "./types";

export const PostApi = (instance: AxiosInstance) => ({
  async getPosts(dto: GetPostDto) {
    const { data } = await instance.get<GetPostDto, { data: ResponsePosts }>(
      "/posts",
      { params: dto }
    );
    return data;
  },
  async createPost(dto: CreatePostDto) {
    const { data } = await instance.post<
      CreatePostDto,
      { data: ResponseCreatePost }
    >("/posts", dto);
    return data;
  },
  async updatePost(dto: UpdatePostDto) {
    const { data } = await instance.patch<
      UpdatePostDto,
      { data: ResponseCreatePost }
    >(`/posts/${dto.id}`, dto);
    return data;
  },
  async getPostBySlug(slug: string) {
    const { data } = await instance.get<string, { data: ResponseCreatePost }>(
      `/posts/${slug}`
    );
    return data;
  },
  async uploadBanner(id: number, images: File[]) {
    const formData = new FormData();
    formData.append("image", images[0]);
    const { data } = await instance.patch<File, { data: ResponseCreatePost }>(
      `/posts/upload/banner/${id}`,
      formData
    );
    return data;
  },
  async deleteBanner(id: number) {
    const { data } = await instance.delete<number>(`/posts/banner/${id}`);
    return data;
  },
  async removePost(id: number) {
    const { data } = await instance.delete<number>(`/posts/${id}`);
    return data;
  },
});

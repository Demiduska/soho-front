import {
  ConfirmEmailDto,
  CreateGameAccountDto,
  CreateUserDtoPg,
  ForgotPasswordDto,
  LoginDto,
  ResponseUser,
  ResponseUserGameAccount,
  SetNewPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from "./types";
import { AxiosInstance } from "axios";

export const UserApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ResponseUser[]>("/users");
    return data;
  },
  async register(dto: CreateUserDtoPg) {
    const { data } = await instance.post<
      CreateUserDtoPg,
      { data: ResponseUser }
    >("/auth/register", dto);
    return data;
  },
  async registerGameAccount(dto: CreateGameAccountDto) {
    const { data } = await instance.post<
      CreateGameAccountDto,
      { data: ResponseUser }
    >("/users/game-account", dto);
    return data;
  },
  async getUserGameAccount(login: string) {
    const { data } = await instance.get<
      string,
      { data: ResponseUserGameAccount }
    >(`/users/game-account`, { params: { login } });
    return data;
  },
  async update(dto: UpdateUserDto) {
    const { data } = await instance.patch<
      UpdateUserDto,
      { data: ResponseUser }
    >("/users", dto);
    return data;
  },
  async uploadAvatar(files: File[]) {
    const formData = new FormData();
    formData.append("file", files[0]);
    const { data } = await instance.post<File, { data: ResponseUser }>(
      "/users/avatar",
      formData
    );
    return data;
  },
  async deleteAvatar(id: number) {
    const { data } = await instance.delete<number>(`/users/avatar/${id}`);
    return data;
  },
  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>(
      "/auth/login",
      dto
    );
    return data;
  },
  async getMe() {
    const { data } = await instance.get<ResponseUser>("/auth");
    return data;
  },
  async confirmEmail(dto: { token: string | string[] }) {
    const { data } = await instance.post<ConfirmEmailDto, { data: string }>(
      "/email-confirmation/confirm",
      dto
    );
    return data;
  },
  async forgotPassword(dto: ForgotPasswordDto) {
    const { data } = await instance.post<ForgotPasswordDto>(
      "/users/forgot-password",
      dto
    );
    return data;
  },
  async setNewPassword(dto: SetNewPasswordDto) {
    const { data } = await instance.post<SetNewPasswordDto>(
      "/users/new-password",
      dto
    );
    return data;
  },
  async updatePassword(dto: UpdatePasswordDto) {
    const { data } = await instance.post<
      UpdatePasswordDto,
      { data: ResponseUser }
    >("/auth/update-password", dto);
    return data;
  },
  // async getOne(id: number) {
  //   const { data } = await instance.get<PostItem>(`/posts/${id}`);
  //   return data;
  // },
});

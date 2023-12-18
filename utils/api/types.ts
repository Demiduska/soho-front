import { PaymentEnum } from "../ts/types";

export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  login: string;
  confirmPassword: string;
} & LoginDto;

export type CreateUserDtoPg = {
  confirmPassword: string;
} & LoginDto;

export type CreateGameAccountDto = {
  login: string;
} & LoginDto;

export type UpdateUserDto = {
  email: string;
  nickName?: string;
  telegram?: string;
  file?: File[];
};

export type ForgotPasswordDto = {
  email: string;
};

export type SetNewPasswordDto = {
  password: string;
  confirmPassword: string;
  token: string | string[] | undefined;
};
export type UpdatePasswordDto = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type ConfirmEmailDto = {
  token: string;
};

export type ResponseEmail = {
  text: string;
};

export type PostType = {
  id: number;
  name: string;
  slug: string;
  content: string;
  nameRu?: string;
  contentRu?: string;
  registeredAt: string;
  updatedAt: string;
  userId?: number;
  banner: BannerType;
  user: ResponseUser | null;
};

export type BannerType = {
  id: number;
  key: string;
  location: string;
};

export type ResponseUser = {
  registeredAt: string;
  updatedAt: string;
  isEmailConfirmed: boolean;
  email: string;
  nickName?: string;
  telegram?: string;
  firstName?: string;
  lastName?: string;
  id?: number;
  role: string;
  posts?: PostType[];
  // commentsCount?: number;
};

export type ResponseUserGameAccount = {
  email: string;
  login: string;
  id: number;
};

export type ResponseCreatePost = {
  id: number;
  registeredAt: string;
  updatedAt: string;
  name: string;
  nameRu?: string;
  slug: string;
  userId?: number;
  user: ResponseUser | null;
  content: string;
  contentRu?: string;
  banner: BannerType;
  // commentsCount?: number;
};

export enum PaymentStatus {
  Created = "Created",
  Processing = "Processing",
  Succeeded = "Succeeded",
  Failed = "Failed",
}

export enum LocaleEnum {
  en = "en-US",
  ru = "ru-RU",
}
export type CreatePostDto = {
  name: string;
  content: string;
  image?: File[] | null;
};

export type UpdatePostDto = {
  id: number;
  name: string;
  nameRu?: string;
  content?: string;
  contentRu?: string;
  image?: File[];
};

export type GetPostDto = {
  offset: number;
  limit: number;
  startId: number;
};

export type ResponsePosts = {
  items: ResponseCreatePost[];
  count: number;
};

export interface Heading {
  id: string;
  text: string;
  image?: string;
}

export type ConfirmPaymentDto = {
  transaction_id: string;
  payment: PaymentEnum;
};

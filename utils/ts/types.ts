import { StaticImageData } from "next/image";
import { ReactElement, ReactSVGElement } from "react";
import { PaymentStatus } from "../api/types";

export type MenuItemType = {
  title: string;
  link: string;
  description: string;
};

export type MenuType = {
  items: MenuItemType[];
};

export type SocialLinkType = {
  link: string;
  icon: SocialIconEnum;
  color: string;
};

export type NewsItemType = {
  date: string;
  title: string;
  content: string;
  link: string;
  image: StaticImageData | string;
};
export type FeaturesItemType = {
  title: string;
  icon: FeaturesIconEnum;
  content: string;
  imageBanner: StaticImageData | string;
  linkVideo: string;
};

export enum FeaturesIconEnum {
  icon_1 = "icon_1",
  icon_2 = "icon_2",
  icon_3 = "icon_3",
  icon_4 = "icon_4",
  icon_5 = "icon_5",
  icon_6 = "icon_6",
  icon_7 = "icon_7",
}

export enum SocialIconEnum {
  discord = "discord",
  telegram = "telegram",
  facebook = "facebook",
  youtube = "youtube",
  twitch = "twitch",
}

export type FormViewType = {
  typeView: "popup" | "page";
  typeDB: "pg" | "sql";
  single?: boolean;
};

export type PaymentDto = {
  login: string;
  amount: number;
  bonus?: number;
  payment: PaymentEnum;
};

export type ResponsePaymentDto = {
  login: string;
  amount: number;
  bonus?: number;
  id: number;
  payment: PaymentEnum;
  registered_at: string;
  updated_at: string;
  status: PaymentStatus;
  total: number;
  email: string;
  transaction_id: string;
  payment_link: string;
};

export enum FormTypeEnum {
  login = "login",
  register = "register",
  success = "success",
  successSentEmail = "successSentEmail",
  forgot = "forgot",
  reset = "reset",
  payment = "payment",
  video = "video",
  newPassword = "newPassword",
  successSetNewPassword = "successSetNewPassword",
  successPayment = "successPayment",
  failedPayment = "failedPayment",
}

export type DownloadFilesType = {
  title: string;
  subtitleLeft: string;
  subtitleRight: string;
  googleLink: string;
  serverLink: string;
  size: string;
};

export type PaymentType = {
  type: PaymentEnum;
  title: string;
  titleRU: string;
  image: StaticImageData;
  background: StaticImageData;
};

export enum PaymentEnum {
  prime = "prime",
  paypalych = "paypalych",
  enot = "enot",
  paygol = "paygol",
  coin = "coin",
  cryptocloud = "cryptocloud",
  paypal = "paypal",
}

export type WikiItemType = {
  title: string;
  icon?: string;
  link: string;
};

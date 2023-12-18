import React, { FC, useEffect, useState } from "react";
import CommonHead from "./head/common-head";
import Head from "next/head";
import { Preloader } from "../preloader/Preloader";
import {
  MenuItemType,
  SocialIconEnum,
  SocialLinkType,
} from "../../utils/ts/types";
import { Header } from "./header/Header";
import { usePathname } from "next/navigation";
import { Footer } from "./footer/Footer";
import { AuthForms } from "./auth-forms";
import { YandexMetric } from "../yandexMetric/YandexMetric";

type LayoutProps = {
  children: React.ReactNode;
};

const MENU: { [key: string]: MenuItemType[] } = {
  en: [
    { title: "Main", link: "#home", description: "Homepage" },
    { title: "About", link: "#about", description: "Project Info" },
    { title: "Unique features", link: "#features", description: "Exclusive" },
    { title: "Download", link: "#download", description: "The Game" },
    { title: "Donations", link: "#donations", description: "Get Rewards" },
    { title: "Server wiki", link: "#wiki", description: "Our Base" },
  ],
  ru: [
    { title: "Главная", link: "#home", description: "Домашняя Страница" },
    { title: "О нас", link: "#about", description: "Описание" },
    {
      title: "Преимущества",
      link: "#features",
      description: "Особенности сервера",
    },
    {
      title: "Начать играть",
      link: "#download",
      description: "Регистрация и Файлы",
    },
    {
      title: "Пожертвование",
      link: "#donations",
      description: "Получить награды",
    },
    { title: "Wiki", link: "#wiki", description: "База знаний" },
  ],
};

const SOCIAL_LINKS: SocialLinkType[] = [
  {
    link: "https://discord.gg/soho",
    icon: SocialIconEnum.discord,
    color: "#414EEC",
  },
  {
    link: "https://t.me/sohoessence",
    icon: SocialIconEnum.telegram,
    color: "#169CDD",
  },
  // { link: "/", icon: SocialIconEnum.facebook, color: "#1A72EB" },
  {
    link: "https://www.youtube.com/channel/UCg8G3wA0FYntplW3qV4mhPw",
    icon: SocialIconEnum.youtube,
    color: "#FF0200",
  },
  {
    link: "https://www.twitch.tv/sohoessence",
    icon: SocialIconEnum.twitch,
    color: "#9147FF",
  },
];

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the time to match the duration of your preload animation
      return () => clearTimeout(timer);
    }
  }, [loading]);
  return (
    <>
      <Head>
        <CommonHead />
      </Head>
      <YandexMetric />
      {loading && <Preloader />}
      {!loading && <Header items={MENU} />}

      <main>{children}</main>
      {!loading && pathname !== "/login" && pathname !== "/registration" && (
        <Footer socials_links={SOCIAL_LINKS} />
      )}
      <AuthForms />
    </>
  );
};

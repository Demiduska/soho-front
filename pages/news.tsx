import Head from "next/head";
import React, { FC } from "react";

import { isAxiosError } from "axios";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { NewsSection } from "../components/sections/news/NewsSection";
import { fetcher } from "../utils/fetcher";
import { GetPostDto, ResponsePosts } from "../utils/api/types";
import { useRouter } from "next/router";

interface NewsProps {
  initialData: ResponsePosts;
  initialOffset: number;
  limit: number;
  startId: number;
}

const News: FC<NewsProps> = ({
  initialData,
  initialOffset,
  limit,
  startId,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <>
      <Head>
        <title>
          {locale === "en"
            ? "Lineage 2 Essence News: Stay up to date!"
            : "Новости Lineage 2 Essence: Будьте в курсе последних событий!"}
        </title>
        <meta
          name="description"
          content={
            locale === "en"
              ? "Get the latest news, updates, and events from the world of Lineage 2 Essence"
              : "Получайте свежие новости, обновления и события мира Lineage 2 Essence "
          }
        />
      </Head>
      <NewsSection
        initialData={initialData}
        initialOffset={initialOffset}
        limit={limit}
        startId={startId}
      />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { req } = ctx;
    const limit = 9;
    const offset = parseInt(ctx.query.offset as string) || 1;
    const startId = parseInt(ctx.query.startId as string) || 1;
    let initialData = null;
    try {
      if (req.cookies?.Authentication) {
        const data = await Api(ctx).user.getMe();
        if (data?.email) {
          store.dispatch(setUserData(data));
        }
      }
      initialData = await fetcher({ limit, offset, startId });
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        console.log(err.response?.data.message);
      }
    }
    return {
      props: {
        initialData,
        initialOffset: offset,
        limit,
        startId,
      },
    };
  }
);

export default News;

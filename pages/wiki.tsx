import Head from "next/head";
import React, { FC, useEffect } from "react";

import { isAxiosError } from "axios";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";
import { PostType } from "../utils/api/types";
import { WikiSection } from "../components/sections/wiki/WikiSection";
import { fetcherGetMe } from "../utils/fetcherGetMe";
import { useAppDispatch } from "../redux/hooks";
import { useRouter } from "next/router";
import useSWRImmutable from "swr/immutable";
import { prepareTabs } from "../utils/content/prepare-tabs";

interface WikiProps {
  post: PostType;
}

const Wiki: FC<WikiProps> = ({ post }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const dispatch = useAppDispatch();

  const { data, error } = useSWRImmutable("getMe", fetcherGetMe, {
    shouldRetryOnError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false; // Suppress retry for 401 errors
      }
      return true; // Retry for other errors
    },
  });

  useEffect(() => {
    if (data?.email) {
      dispatch(setUserData(data));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>
          {locale === "en"
            ? "Lineage 2 Essence: Knowledge Base for Soho Essence Players"
            : "Lineage 2 Essence: База знаний для игроков Soho Essence"}
        </title>
        <meta
          name="description"
          content={
            locale === "en"
              ? "Our Lineage 2 Essence knowledge base gives you all the information, tips and guides you need to play Soho."
              : "Наша база знаний по игре Lineage 2 Essence предлагает вам все необходимые сведения, советы и руководства для игры на Soho."
          }
        />
      </Head>
      {post && (
        <WikiSection
          slug={post.slug}
          banner={post.banner}
          user={post.user}
          id={post.id}
          name={post.name}
          registeredAt={post.registeredAt}
          updatedAt={post.updatedAt}
          content={post.content}
          userId={post.userId}
          nameRu={post.nameRu}
          contentRu={post.contentRu}
        />
      )}
    </>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  let post: PostType | null = null;
  try {
    post = await Api().post.getPostBySlug("wiki");
    if (post?.content) {
      post.content = prepareTabs(post.content);
    }
    if (post?.contentRu) {
      post.contentRu = prepareTabs(post.contentRu);
    }
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      console.log(err.response?.data.message);
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
});

export default Wiki;

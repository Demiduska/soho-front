import { FC, useEffect, useState } from "react";
import { Container } from "../../common/container/container";
import { ButtonBack } from "../../buttons/ButtonBack";
import Image from "next/image";
import { AddPostButton } from "../../buttons/add-post/AddPostButton";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import {
  GetPostDto,
  ResponseCreatePost,
  ResponsePosts,
} from "../../../utils/api/types";
import useSWR from "swr";
import { CardNews } from "../../cards/CardNews";
import { fetcher } from "../../../utils/fetcher";
import { Pagination } from "../../pagination/Pagination";
import { useRouter } from "next/router";
import { localization } from "../../../utils/localization";

import back from "../../../public/images/back-news.png";

import styles from "./NewsSection.module.scss";

interface NewsSectionProps {
  initialData: ResponsePosts;
  initialOffset: number;
  limit: number;
  startId: number;
}

export const NewsSection: FC<NewsSectionProps> = ({
  initialData,
  initialOffset,
  limit,
  startId,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const userData = useAppSelector(selectUserData);
  const [offset, setOffset] = useState<number>(initialOffset);
  const params: GetPostDto = {
    limit,
    offset: (offset - 1) * limit,
    startId,
  };

  const { data, error } = useSWR(params, fetcher, {
    fallbackData: offset === initialOffset ? initialData : undefined,
  });

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const params = new URLSearchParams(url.split("?")[1]);
      setOffset(Number(params.get("offset") || 0));
    };

    window.addEventListener("popstate", () =>
      handleRouteChange(window.location.href)
    );

    return () => {
      window.removeEventListener("popstate", () =>
        handleRouteChange(window.location.href)
      );
    };
  }, []);

  if (error) return <div>Error loading posts</div>;

  const handleOffsetChange = (newOffset: number) => {
    setOffset(newOffset);
    const params = new URLSearchParams(window.location.search);
    params.set("offset", newOffset.toString());
    history.pushState(null, "", `${location.pathname}?${params.toString()}`);
  };

  return (
    <section className={styles.section}>
      <Image
        src={back}
        quality={100}
        className={styles.section__back}
        alt={"back"}
      />
      <Container>
        <div className={styles.section__head}>
          <ButtonBack />
          {userData && userData.role === "Admin" && (
            <AddPostButton type={"create"} className={"ml-12"} />
          )}
        </div>
        <h1 className={"text-center mt-sm-12 mt-24"}>
          {localization[locale].news}
        </h1>
        <div className={styles.section__posts}>
          {data?.items
            .filter((item) => item.slug !== "wiki")
            .map((post: ResponseCreatePost) => (
              <CardNews
                user={post.user}
                key={post.id}
                name={post.name}
                nameRu={post.nameRu}
                content={post.content}
                contentRu={post.contentRu}
                slug={post.slug}
                registeredAt={post.registeredAt}
                updatedAt={post.updatedAt}
                id={post.id}
                banner={post.banner}
              />
            ))}
        </div>
        {data?.count && (
          <Pagination
            limit={9}
            count={data.count}
            onClick={handleOffsetChange}
            currentPage={offset}
            className={"mt-sm-24 mt-48"}
          />
        )}
      </Container>
    </section>
  );
};

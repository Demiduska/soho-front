import React, { FC } from "react";
import { Container } from "../../common/container/container";
import { PostType } from "../../../utils/api/types";
import { CardNews } from "../../cards/CardNews";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";

import styles from "./RelatedNews.module.scss";
import { endpoints } from "../../../utils/constants";
import { SliderNews } from "../../slider/SliderNews";
import Swipe from "../../../public/images/icons/swipe.svg";

interface RelatedNewsProps {
  relatedPosts: PostType[];
}

export const RelatedNews: FC<RelatedNewsProps> = ({ relatedPosts }) => {
  const [width, height] = useWindowSize();

  return (
    <section className={"section--relative"}>
      <Container>
        <h2 className={"mb-24"}>Related news</h2>
        {relatedPosts && (
          <div className={styles.news__wrap}>
            {width > endpoints.sm ? (
              relatedPosts
                .filter((item) => item.slug !== "wiki")
                .map((item) => (
                  <CardNews
                    key={item.id}
                    id={item.id}
                    registeredAt={item.registeredAt}
                    updatedAt={item.updatedAt}
                    name={item.name}
                    slug={item.slug}
                    user={item.user}
                    content={item.content}
                    banner={item.banner}
                  />
                ))
            ) : (
              <>
                <SliderNews
                  className={styles.news__slider}
                  slides={relatedPosts}
                />
                <div className={styles.news__slider_swipe}>
                  <Swipe />
                </div>
              </>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

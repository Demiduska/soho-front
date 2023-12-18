import { FC } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import styles from "./SliderNews.module.scss";

import classNames from "classnames";
import { CardNews } from "../cards/CardNews";
import { endpoints } from "../../utils/constants";
import { ResponseCreatePost } from "../../utils/api/types";
import { useRouter } from "next/router";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  // swipeToSlide: true,
  // focusOnSelect: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: true,
  responsive: [
    {
      breakpoint: endpoints.md,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

interface SliderNewsProps {
  slides: ResponseCreatePost[];
  className?: string;
}

export const SliderNews: FC<SliderNewsProps> = ({ slides, className }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <Slider
      className={classNames("slider", styles.slider, className && className)}
      {...settings}
    >
      {slides.map((post, index) => (
        <CardNews
          user={post.user}
          key={post.id}
          name={locale === "en" ? post.name : post.nameRu ? post.nameRu : ""}
          content={
            locale === "en"
              ? post.content
              : post.contentRu
              ? post.contentRu
              : ""
          }
          slug={post.slug}
          registeredAt={post.registeredAt}
          updatedAt={post.updatedAt}
          id={post.id}
          banner={post.banner}
        />
      ))}
    </Slider>
  );
};

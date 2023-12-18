import React, { FC } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import { WikiItemType } from "../../utils/ts/types";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import styles from "./SliderWiki.module.scss";

import { endpoints } from "../../utils/constants";
import { CardWiki } from "../cards/CardWiki";

interface SliderWikiProps {
  slides: WikiItemType[] | null;
}

const settings = {
  dots: false,
  infinite: true,
  arrows: false,
  swipeToSlide: true,
  focusOnSelect: true,
  centerMode: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: false,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: endpoints.sm,
      settings: {
        slidesToShow: 1,
        variableWidth: true,
        centerMode: false,
      },
    },
  ],
};

export const SliderWiki: FC<SliderWikiProps> = ({ slides }) => {
  return (
    <>
      <Slider className={classNames("slider", styles.slider)} {...settings}>
        {slides?.map((item, index) => (
          <CardWiki
            key={index}
            title={item.title}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </Slider>
    </>
  );
};

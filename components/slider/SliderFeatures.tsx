import { FC } from "react";
import Slider from "react-slick";

import classNames from "classnames";
import { FeaturesItemType, NewsItemType } from "../../utils/ts/types";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import styles from "./SliderFeatures.module.scss";
import { IconFeature } from "../icons/IconFeature";
import { CardFeature } from "../cards/CardFeature";

interface SliderFeaturesProps {
  slides: FeaturesItemType[];
}

export const SliderFeatures: FC<SliderFeaturesProps> = ({ slides }) => {
  const settings = {
    customPaging: (i: number) => {
      return (
        <a>
          <IconFeature icon={slides[i].icon} title={slides[i].title} />
        </a>
      );
    },
    dotsClass: "custom-dots",
    dots: true,
    infinite: false,
    fade: true,
    arrows: false,
    speed: 500,
    // swipeToSlide: true,
    // focusOnSelect: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider className={classNames("slider", styles.slider)} {...settings}>
      {slides.map((item, index) => (
        <CardFeature
          icon={item.icon}
          key={index}
          title={item.title}
          content={item.content}
          linkVideo={item.linkVideo}
          imageBanner={item.imageBanner}
        />
      ))}
    </Slider>
  );
};

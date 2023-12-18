import React, { FC } from "react";
import classNames from "classnames";
import Slider from "react-slick";
import { CardPayment } from "../cards/CardPayment";
import { PaymentType } from "../../utils/ts/types";

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import styles from "./SliderPayments.module.scss";

import Swipe from "../../public/images/icons/swipe.svg";
import { endpoints } from "../../utils/constants";

interface SliderPaymentsProps {
  slides: PaymentType[];
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

export const SliderPayments: FC<SliderPaymentsProps> = ({ slides }) => {
  return (
    <>
      <Slider className={classNames("slider", styles.slider)} {...settings}>
        {slides.map((item, index) => (
          <CardPayment
            key={index}
            type={item.type}
            image={item.image}
            background={item.background}
            title={item.title}
            titleRU={item.titleRU}
          />
        ))}
      </Slider>
      <div className={styles.slider__swipe}>
        <Swipe />
      </div>
    </>
  );
};

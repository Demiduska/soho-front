import React, { FC, useRef } from "react";
import { FPSection } from "./FPSection";
import classNames from "classnames";
import { FeaturesItemType, NewsItemType } from "../../utils/ts/types";
import Link from "next/link";
import { SliderFeatures } from "../slider/SliderFeatures";
import { Button } from "../buttons/Button";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import Swipe from "../../public/images/icons/swipe.svg";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./FPSection.module.scss";
import stylesFeatures from "./Features.module.scss";

interface FeaturesProps {
  anchor: string;
  slides: FeaturesItemType[];
  slidesRu: FeaturesItemType[];
}

export const Features: FC<FeaturesProps> = ({ anchor, slides, slidesRu }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  return (
    <FPSection className={stylesFeatures.section} anchor={anchor}>
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          poster={"/images/poster/bg3.png"}
          playsInline={true}
        >
          <source src={"/videos/back3.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={styles.section__content}>
        <h2
          className={classNames(
            styles.section__title,
            "h1",
            "mb-sm-24",
            "mb-48",
            "text-center"
          )}
        >
          {localization[locale].uniqueFeatures}
        </h2>
        <div className={stylesFeatures.section__wrap}>
          <SliderFeatures slides={locale === "en" ? slides : slidesRu} />
          {width <= endpoints.sm && (
            <div className={styles.section__swipe}>
              <Swipe />
            </div>
          )}
          <div className={stylesFeatures.section__button}>
            <Button
              link={"/wiki"}
              className={"btn--gold"}
              type={"link"}
              style={"symbols"}
            >
              {localization[locale].serverWiki}
            </Button>
          </div>
        </div>
      </div>
    </FPSection>
  );
};

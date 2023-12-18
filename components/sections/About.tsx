import React, { FC, useRef } from "react";
import { FPSection } from "./FPSection";
import classNames from "classnames";
import { ProjectInfo } from "../info/ProjectInfo";
import { SliderNews } from "../slider/SliderNews";
import Link from "next/link";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { Button } from "../buttons/Button";
import { ResponseCreatePost } from "../../utils/api/types";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./FPSection.module.scss";
import stylesAbout from "./About.module.scss";

import Romb from "../../public/images/icons/romb.svg";

interface AboutProps {
  anchor: string;
  slides: ResponseCreatePost[];
}

export const About: FC<AboutProps> = ({ anchor, slides }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  return (
    <FPSection
      className={stylesAbout.section}
      anchor={anchor}
      container={false}
    >
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline={true}
          poster={"/images/poster/bg2.png"}
        >
          <source src={"/videos/back2.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={stylesAbout.section__content}>
        <h2
          className={classNames(styles.section__title, "h1", "mb-sm-12 mb-48")}
        >
          {localization[locale].aboutTitle}
        </h2>
        <div className={stylesAbout.section__wrap}>
          <div className={stylesAbout.project}>
            <h3 className={"mb-24"}>{localization[locale].aboutProjectInfo}</h3>
            <ProjectInfo
              content={localization[locale].aboutProjectInfoContent}
            />
            {width <= endpoints.sm && (
              <div className={stylesAbout.section__button_wrap}>
                <Button
                  link={"/news"}
                  className={"btn--gold"}
                  type={"link"}
                  style={"symbols"}
                >
                  {localization[locale].aboutProjectNews}
                </Button>
              </div>
            )}
          </div>
          {width > endpoints.sm && (
            <div>
              <div className={stylesAbout.news__title}>
                <h3>{localization[locale].aboutLatestNews}</h3>
                <Link className={stylesAbout.news__link} href={"/news"}>
                  <Romb />
                  {localization[locale].aboutAllNews}
                </Link>
              </div>
              {slides && <SliderNews slides={slides} />}
            </div>
          )}
        </div>
      </div>
    </FPSection>
  );
};

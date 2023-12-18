import React, { FC, useRef } from "react";
import { FPSection } from "./FPSection";
import { Button } from "../buttons/Button";
import { VideoPopupButtonWithPreview } from "../buttons/VideoPopupButtonWithPreview";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./FPSection.module.scss";
import stylesHome from "./Home.module.scss";

import LogoBig from "../../public/images/LogoBig.svg";
import Discord from "../../public/images/icons/discord.svg";

interface HomeProps {
  anchor: string;
}

export const Home: FC<HomeProps> = ({ anchor }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  return (
    <FPSection anchor={anchor}>
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          poster={"/images/poster/bg1.png"}
          playsInline={true}
        >
          <source src={"/videos/back.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={stylesHome.section__content}>
        <div className={stylesHome.section__logo}>
          <LogoBig width={624} height={226} />
        </div>

        <h1 className={"h3"}>{localization[locale].grandOpening}</h1>

        <div className={"text-primary-white-48 mt-12 mb-sm-24 mb-36 "}>
          {localization[locale].grandOpeningDescription}
        </div>
        <div className={stylesHome.section__buttons}>
          <Button
            useNextLink={false}
            link={locale === "en" ? "/#download" : `/${locale}#download`}
            className={"btn--gold mr-6"}
            type={"link"}
            style={"symbols"}
          >
            {localization[locale].playNow}
          </Button>
          <Button
            link={"https://discord.gg/soho"}
            target={"_blank"}
            className={"btn--transparent ml-6"}
            type={"link"}
            style={"transparent"}
            icon={<Discord />}
          >
            Discord
          </Button>
        </div>
        <VideoPopupButtonWithPreview
          link={"https://www.youtube.com/embed/7BrN-sb4EAU"}
        />
      </div>
    </FPSection>
  );
};

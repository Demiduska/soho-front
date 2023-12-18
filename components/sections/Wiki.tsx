import React, { FC, useEffect, useRef } from "react";
import { FPSection } from "./FPSection";
import classNames from "classnames";
import { WikiItemType } from "../../utils/ts/types";
import { CardWiki } from "../cards/CardWiki";
import { Button } from "../buttons/Button";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { SliderWiki } from "../slider/SliderWiki";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";
import { ResponseCreatePost } from "../../utils/api/types";

import styles from "./FPSection.module.scss";
import stylesWiki from "./Wiki.module.scss";

import Swipe from "../../public/images/icons/swipe.svg";

interface WikiProps {
  anchor: string;
  wikiPage: ResponseCreatePost;
}

export const Wiki: FC<WikiProps> = ({ anchor, wikiPage }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  let wikiItems = useRef<WikiItemType[] | null>(null);
  let wikiItemsRu = useRef<WikiItemType[] | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(wikiPage.content, "text/html");
    const h2Elements = doc.getElementsByTagName("h2");
    const docRu = parser.parseFromString(
      wikiPage.contentRu as string,
      "text/html"
    );
    const h2ElementsRu = docRu.getElementsByTagName("h2");
    wikiItems.current = Array.from(h2Elements)
      .map((h2) => {
        const imgElement = h2.querySelector("img");
        const text = imgElement
          ? imgElement.nextSibling?.textContent || ""
          : h2.textContent || "";
        const image = imgElement ? imgElement.src : undefined;
        let id = text.toLowerCase().replace(/\s+/g, "-");
        id = id.replace(/^-/, ""); // Remove leading hyphen, if any
        return {
          title: h2?.textContent ? h2.textContent.trim() : "",
          icon: image,
          link: id,
        };
      })
      .slice(0, 14);
    wikiItemsRu.current = Array.from(h2ElementsRu)
      .map((h2) => {
        const imgElement = h2.querySelector("img");
        const text = imgElement
          ? imgElement.nextSibling?.textContent || ""
          : h2.textContent || "";
        const image = imgElement ? imgElement.src : undefined;
        let id = text.toLowerCase().replace(/\s+/g, "-");
        id = id.replace(/^-/, ""); // Remove leading hyphen, if any
        return {
          title: h2?.textContent ? h2.textContent.trim() : "",
          icon: image,
          link: id,
        };
      })
      .slice(0, 14);
  }, []);

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  return (
    <FPSection className={stylesWiki.section} anchor={anchor}>
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          poster={"/images/poster/bg6.png"}
          playsInline={true}
        >
          <source src={"/videos/back6.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={styles.section__content}>
        <h2
          className={classNames(
            styles.section__title,
            "h1",
            "mb-24",
            "text-center"
          )}
        >
          {localization[locale].serverWiki}
        </h2>
        <h3 className={"text-center"}>
          {localization[locale].ServerWikiDescription}
        </h3>
        <div className={stylesWiki.section__wrap}>
          {width > endpoints.sm &&
            (locale === "en"
              ? wikiItems.current?.map((item, index) => (
                  <CardWiki
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                  />
                ))
              : wikiItemsRu.current?.map((item, index) => (
                  <CardWiki
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    link={item.link}
                  />
                )))}
        </div>
        {width <= endpoints.sm && (
          <>
            <SliderWiki
              slides={locale === "en" ? wikiItems.current : wikiItemsRu.current}
            />
            <div className={styles.section__swipe}>
              <Swipe />
            </div>
          </>
        )}
        <div className={stylesWiki.section__button}>
          <Button
            link={"/wiki"}
            className={"btn--gold"}
            type={"link"}
            style={"symbols"}
          >
            {localization[locale].toServerWiki}
          </Button>
        </div>
      </div>
    </FPSection>
  );
};

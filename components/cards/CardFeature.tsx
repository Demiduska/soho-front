import { FC } from "react";
import { FeaturesItemType } from "../../utils/ts/types";
import Image from "next/image";
import { VideoPopupButton } from "../buttons/VideoPopupButton";
import { useWindowSize } from "../../utils/hooks/useWindowSize";

import styles from "./CardFeature.module.scss";
import { endpoints } from "../../utils/constants";

export const CardFeature: FC<FeaturesItemType> = ({
  icon,
  title,
  content,
  linkVideo,
  imageBanner,
}) => {
  const [width, height] = useWindowSize();

  return (
    <div className={styles.card}>
      {width > endpoints.sm && (
        <div>
          <div className={styles.card__image_wrap}>
            <Image
              width={514}
              height={290}
              src={imageBanner}
              alt={title}
              title={title}
            />
            {linkVideo && (
              <VideoPopupButton width={96} height={96} link={linkVideo} />
            )}
          </div>
        </div>
      )}

      <div>
        <h3 className={styles.card__title}>{title.replace("<br>", "")}</h3>
        {width <= endpoints.sm && (
          <div className={styles.card__image_wrap}>
            <Image
              width={514}
              height={290}
              src={imageBanner}
              alt={title}
              title={title}
            />
            {linkVideo && (
              <VideoPopupButton width={96} height={96} link={linkVideo} />
            )}
          </div>
        )}
        <div className={styles.card__content}>{content}</div>
      </div>
    </div>
  );
};

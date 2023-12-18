import React, { FC } from "react";
import { WikiItemType } from "../../utils/ts/types";
import Link from "next/link";
import classNames from "classnames";
import Image from "next/image";

import styles from "./CardWiki.module.scss";

export const CardWiki: FC<WikiItemType> = ({ title, link, icon }) => {
  return (
    <Link
      className={classNames(styles.card, "card--wiki")}
      href={`/wiki#${link}`}
      prefetch={false}
    >
      <div className={styles.card__inner}>
        <span />
        <span />
      </div>
      <div className={styles.card__icon}>
        {icon && (
          <Image
            width={32}
            height={32}
            src={icon}
            title={title}
            alt={title}
            quality={1}
          />
        )}
      </div>
      <div className={styles.card__title}>{title}</div>
    </Link>
  );
};

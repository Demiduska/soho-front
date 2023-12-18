import React, { FC } from "react";
import { DownloadFilesType } from "../../utils/ts/types";
import { Button } from "../buttons/Button";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./FilesItem.module.scss";

export const FilesItem: FC<DownloadFilesType> = ({
  title,
  size,
  googleLink,
  serverLink,
  subtitleLeft,
  subtitleRight,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <div className={styles.item}>
      <div className={styles.item__title}>{title}</div>
      <div className={styles.item__files}>
        <Button
          link={googleLink}
          className={classNames(
            "btn--gold",
            styles.item__button,
            styles.item__button_google
          )}
          type={"link"}
          style={"symbols"}
          target={"_blank"}
        >
          <div>{subtitleLeft}</div>
          <div className={styles.item__button_size}>{size}</div>
        </Button>
        <Button
          link={serverLink}
          className={classNames(
            "btn--transparent",
            styles.item__button,
            styles.item__button_google
          )}
          type={"link"}
          style={"transparent"}
          target={"_blank"}
        >
          <div>{subtitleRight}</div>
          <div className={styles.item__button_size}>{size}</div>
        </Button>
      </div>
    </div>
  );
};

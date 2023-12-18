import React, { FC } from "react";
import { DownloadFilesType } from "../../utils/ts/types";
import { FilesItem } from "./FilesItem";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { useRouter } from "next/router";

import styles from "./DownloadFiles.module.scss";
import { localization } from "../../utils/localization";

const filesRU: DownloadFilesType[] = [
  {
    title: "Client Crusaded (388)",
    subtitleLeft: "Google диск",
    subtitleRight: "Торрент",
    googleLink:
      "https://drive.google.com/file/d/1qj_4TZtkmveS_Su3ioFTIpJDYPcEg8JQ/view?usp=sharing",
    serverLink:
      "https://drive.google.com/file/d/1d0e-nU-hH5YLPeDIXi-CIxyKcedn6vyS/view?usp=sharing",
    size: "15.1 gb",
  },
  {
    title: "Updater",
    subtitleLeft: "Скачать",
    subtitleRight: "Зеркало",
    googleLink:
      "https://cdn.discordapp.com/attachments/1072919940631379988/1143165525967507586/SOHO.exe",
    serverLink:
      "https://drive.google.com/file/d/1oOlqNRnHI6OYkMhgdD7l6WY47wJy7TG-/view?usp=sharing",
    size: "1.1 mb",
  },
];

const files: DownloadFilesType[] = [
  {
    title: "Client Crusaded (388)",
    subtitleLeft: "Google Disk",
    subtitleRight: "Torrent",
    googleLink:
      "https://drive.google.com/file/d/1qj_4TZtkmveS_Su3ioFTIpJDYPcEg8JQ/view?usp=sharing",
    serverLink:
      "https://drive.google.com/file/d/1d0e-nU-hH5YLPeDIXi-CIxyKcedn6vyS/view?usp=sharing",
    size: "15.1 gb",
  },
  {
    title: "Updater",
    subtitleLeft: "Download",
    subtitleRight: "Mirror",
    googleLink:
      "https://cdn.discordapp.com/attachments/1072919940631379988/1143165525967507586/SOHO.exe",
    serverLink:
      "https://drive.google.com/file/d/1oOlqNRnHI6OYkMhgdD7l6WY47wJy7TG-/view?usp=sharing",
    size: "1.1 mb",
  },
];

export const DownloadFiles: FC = () => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();

  return (
    <div className={styles.files}>
      {width > endpoints.sm && (
        <div className={"subtitle--step text-center"}>
          {localization[locale].step2}
        </div>
      )}
      <h3 className={styles.files__title}>
        {localization[locale].downloadTheFiles}
      </h3>
      <div>
        {locale === "en"
          ? files.map((item, index) => (
              <FilesItem
                key={index}
                title={item.title}
                googleLink={item.googleLink}
                serverLink={item.serverLink}
                size={item.size}
                subtitleLeft={item.subtitleLeft}
                subtitleRight={item.subtitleRight}
              />
            ))
          : filesRU.map((item, index) => (
              <FilesItem
                key={index}
                title={item.title}
                googleLink={item.googleLink}
                serverLink={item.serverLink}
                size={item.size}
                subtitleLeft={item.subtitleLeft}
                subtitleRight={item.subtitleRight}
              />
            ))}
      </div>
    </div>
  );
};

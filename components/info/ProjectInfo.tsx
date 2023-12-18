import { FC } from "react";

import styles from "./ProjectInfo.module.scss";
import classNames from "classnames";

interface ProjectInfoProps {
  content: string;
}

export const ProjectInfo: FC<ProjectInfoProps> = ({ content }) => {
  return (
    <div
      className={classNames(styles.block, "content")}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

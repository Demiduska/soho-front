import { FC } from "react";
import classNames from "classnames";

import styles from "./Date.module.scss";
import { convertToDateWithOptions } from "../../utils/date/convertToDateWithOptions";
import { LocaleEnum } from "../../utils/api/types";

interface DateProps {
  className?: string;
  date: string;
  locale: LocaleEnum;
}

export const Date: FC<DateProps> = ({ date, className, locale }) => {
  return (
    <div className={classNames(className && className, styles.date)}>
      {convertToDateWithOptions(date, locale)}
    </div>
  );
};

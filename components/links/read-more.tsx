import { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./ReadMore.module.scss";

import Romb from "../../public/images/icons/romb.svg";

interface ReadMoreProps {
  link: string;
  className?: string;
}

export const ReadMore: FC<ReadMoreProps> = ({ link, className }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <Link
      className={classNames(styles.link, className && className)}
      href={link}
    >
      <Romb />
      {localization[locale].readMore}
    </Link>
  );
};

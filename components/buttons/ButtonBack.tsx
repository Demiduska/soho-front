import { FC } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./ButtonBack.module.scss";

interface ButtonBackProps {
  className?: string;
  onClick?: () => void;
}

export const ButtonBack: FC<ButtonBackProps> = ({ className, onClick }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "";

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      onClick={onClick ? onClick : handleClick}
      className={classNames(className && className, styles.button)}
    >
      <span />
      {localization[locale].back}
    </button>
  );
};

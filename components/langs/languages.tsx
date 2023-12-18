import { FC, useState } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import styles from "./Languages.module.scss";

import Lang from "../../public/images/icons/lang.svg";
import ChevronDown from "../../public/images/icons/chevron-down.svg";

type LanguagesProps = {
  className?: string;
};

interface LanguagesI {
  title: string;
  locale: string;
}

const languagesItems: LanguagesI[] = [
  { title: "EN", locale: "en" },
  { title: "RU", locale: "ru" },
];

export const Languages: FC<LanguagesProps> = ({ className }) => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleDropdown = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.lang}>
      <button
        onClick={toggleDropdown}
        className={classNames(className && className, styles.lang__button)}
      >
        <div className={styles.lang__current}>
          <Lang />
          <span className={styles.lang__locale}>
            {locale === "ru" ? "RU" : "EN"}
          </span>
          <span
            className={classNames(
              styles.lang__arrow,
              isOpen && styles.lang__arrow_active
            )}
          >
            <ChevronDown />
          </span>
        </div>
      </button>
      {isOpen && (
        <motion.ul
          className={classNames(styles.lang__dropdown)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {languagesItems.map((item) => (
            <motion.li key={item.locale} className={styles.lang__dropdown_item}>
              <button
                onClick={() => {
                  router.push({ pathname, query }, asPath, {
                    locale: item.locale,
                  });
                  setOpen(false);
                }}
              >
                {item.title}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

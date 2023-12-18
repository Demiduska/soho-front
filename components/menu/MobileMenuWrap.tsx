import { FC } from "react";
import { MenuItemType } from "../../utils/ts/types";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import classNames from "classnames";
import { motion } from "framer-motion";
import { Menu } from "./Menu";

import styles from "./MobileMenuWrap.module.scss";
import { endpoints } from "../../utils/constants";
import { Languages } from "../langs/languages";

interface MobileMenuWrapProps {
  isOpen: boolean;
  items: MenuItemType[];
}

const menuVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at right 0px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at right 0px)",
    transition: {
      // delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "spring",
    },
  },
  closed: {
    opacity: 0,
  },
};

export const MobileMenuWrap: FC<MobileMenuWrapProps> = ({ isOpen, items }) => {
  const [width, height] = useWindowSize();

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={classNames(styles.menu__wrap, isOpen && "active")}
    >
      <motion.div className={styles.menu__background} variants={menuVariants} />
      <motion.div variants={variants}>
        <nav className={styles.menu__nav}>
          <Menu items={items} />
        </nav>
      </motion.div>
      {width <= endpoints.sm && (
        <div className={"d-flex justify-center"}>
          <Languages className={"ml-24"} />
        </div>
      )}
    </motion.div>
  );
};

import { FC, useEffect } from "react";

import { MenuType } from "../../utils/ts/types";

import styles from "./Menu.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

export const Menu: FC<MenuType> = ({ items }) => {
  const { pathname } = useRouter();
  useEffect(() => {
    if (pathname !== "/") {
      const items = document.querySelectorAll(".menu-item");
      items.forEach((item) => {
        item.classList.remove("active"); // Remove 'active' class
      });
    }
  }, [pathname]);

  return (
    <ul className={styles.menu} id={"menu"}>
      {items.map((item, index) => (
        <li
          data-menuanchor={item.link.replace("#", "")}
          className={classNames(styles.menu__item, "menu-item")}
          key={index}
        >
          {pathname === "/" ? (
            <a className={styles.menu__link} href={item.link}>
              <span className={styles.menu__link_title}>{item.title}</span>
              <span className={styles.menu__link_desc}>{item.description}</span>
            </a>
          ) : (
            <Link className={styles.menu__link} href={"/" + item.link}>
              <span className={styles.menu__link_title}>{item.title}</span>
              <span className={styles.menu__link_desc}>{item.description}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

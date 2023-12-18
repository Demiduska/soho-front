import { FC } from "react";
import { MenuItemType } from "../../../utils/ts/types";
import { Container } from "../container/container";
import Link from "next/link";
import Logo from "../../../public/images/logo.svg";
import { Languages } from "../../langs/languages";
import { Menu } from "../../menu/Menu";

import styles from "./Header.module.scss";

interface HeaderProps {
  items: MenuItemType[];
}

export const HeaderFullPage: FC<HeaderProps> = ({ items }) => {
  return (
    <header className={styles.header}>
      <Container fluid>
        <div className={styles.header__wrap}>
          <div className={styles.header__logo}>
            <Link href={"/"}>
              <Logo />
            </Link>
            <Languages className={"ml-24"} />
          </div>
          <div>
            <Menu items={items} />
          </div>
          <div className={styles.header__play}>
            <Link className="btn" href={""}>
              Play Now
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

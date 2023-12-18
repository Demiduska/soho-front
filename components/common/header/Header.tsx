import { FC, useEffect, useState } from "react";
import { MenuItemType } from "../../../utils/ts/types";
import { Container } from "../container/container";
import Link from "next/link";
import { Languages } from "../../langs/languages";
import { Menu } from "../../menu/Menu";
import { endpoints } from "../../../utils/constants";
import { useWindowSize } from "../../../utils/hooks/useWindowSize";
import Hamburger from "hamburger-react";
import { MobileMenuWrap } from "../../menu/MobileMenuWrap";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { localization } from "../../../utils/localization";

import Logo from "../../../public/images/logo.svg";

import styles from "./Header.module.scss";

interface HeaderProps {
  items: { [key: string]: MenuItemType[] };
}

export const Header: FC<HeaderProps> = ({ items }) => {
  const pathname = usePathname();
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const [isOpen, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Container fluid>
        <div className={styles.header__wrap}>
          <div className={styles.header__logo}>
            <Link href={"/"}>
              <Logo />
            </Link>
            {width > endpoints.sm && <Languages className={"ml-24"} />}
          </div>
          {width > endpoints.xl && (
            <div>
              <Menu items={items[locale]} />
            </div>
          )}
          <div className={styles.header__play}>
            <a
              className="btn"
              href={locale === "en" ? "/#download" : `/${locale}#download`}
            >
              {localization[locale].playNow}
            </a>
            {width <= endpoints.xl && (
              <div className={styles.header__hamburger}>
                <Hamburger
                  direction="right"
                  toggled={isOpen}
                  toggle={setOpen}
                  size={20}
                  color="#ffffff"
                />
              </div>
            )}
          </div>
          {width <= endpoints.xl && (
            <MobileMenuWrap isOpen={isOpen} items={items[locale]} />
          )}
        </div>
      </Container>
    </header>
  );
};

import { FC } from "react";
import { SocialLinkType } from "../../../utils/ts/types";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { Container } from "../container/container";
import { SocialLinks } from "../../social-links/social-links";
import Link from "next/link";
import { useRouter } from "next/router";
import { localization } from "../../../utils/localization";

import styles from "./Footer.module.scss";

interface FooterProps {
  socials_links: SocialLinkType[];
}

export const Footer: FC<FooterProps> = ({ socials_links }) => {
  const pathName = usePathname();
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <>
      <footer
        className={classNames(
          pathName === "/" && styles.footer__fixed,
          styles.footer
        )}
      >
        <Container fluid>
          <div className={styles.footer__wrap}>
            <SocialLinks items={socials_links} />
            <div className={"text-primary-white-48 text-center"}>
              {/*{new Date().getFullYear()} © Soho.Fun - All rights reserved*/}
              {localization[locale].footerText}
            </div>
            <ul className={styles.footer__terms}>
              <li>
                <Link href={"/privacy"}>
                  {localization[locale].policyTitle}
                </Link>
              </li>
              <li>
                <Link href={"/terms"}>{localization[locale].termsTitle}</Link>
              </li>
            </ul>
          </div>
          {/*<div className={"text-primary-white-48 text-center"}>*/}
          {/*  Lineage 2 public test server. These servers are an emulator of the*/}
          {/*  Lineage 2 game. The use of the service is for informational purposes*/}
          {/*  only. You can familiarize yourself with the original version of the*/}
          {/*  game Lineage 2 on the official servers of NCSoft.*/}
          {/*</div>*/}
        </Container>
      </footer>
    </>
  );
};

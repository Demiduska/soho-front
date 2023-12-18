import { FC } from "react";
import { SocialIconEnum, SocialLinkType } from "../../utils/ts/types";
import Link from "next/link";
import Discord from "../../public/images/icons/discord.svg";
import Tg from "../../public/images/icons/tg.svg";
import Fb from "../../public/images/icons/fb.svg";
import Ytb from "../../public/images/icons/ytb.svg";
import Twitch from "../../public/images/icons/twitch.svg";

import styles from "./SocialLinks.module.scss";
import classNames from "classnames";

interface SocialLinksProps {
  items: SocialLinkType[];
}

export const SocialLinks: FC<SocialLinksProps> = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li
          className={classNames(styles.list__item, `link-${index}`)}
          key={index + 100}
        >
          <Link
            className={classNames(styles.list__link)}
            href={item.link}
            target={"_blank"}
          >
            {item.icon === SocialIconEnum.facebook && <Fb />}
            {item.icon === SocialIconEnum.discord && <Discord />}
            {item.icon === SocialIconEnum.telegram && <Tg />}
            {item.icon === SocialIconEnum.twitch && <Twitch />}
            {item.icon === SocialIconEnum.youtube && <Ytb />}
          </Link>
          <style jsx>{`
            .link-${index}:hover {
              background: ${item.color};
            }
          `}</style>
        </li>
      ))}
    </ul>
  );
};

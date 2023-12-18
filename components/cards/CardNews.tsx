import { FC } from "react";
import Image from "next/image";
import clip from "text-clipper";
import Link from "next/link";
import { ReadMore } from "../links/read-more";
import { Date } from "../date/Date";
import { LocaleEnum, ResponseCreatePost } from "../../utils/api/types";
import classNames from "classnames";
import { useRouter } from "next/router";

import styles from "./CardNews.module.scss";

export const CardNews: FC<ResponseCreatePost> = ({
  name,
  nameRu,
  content,
  contentRu,
  updatedAt,
  registeredAt,
  banner,
  slug,
  id,
  user,
}) => {
  const link: string = `/posts/${slug}`;

  return (
    <div className={styles.card}>
      <div className={styles.card__inner}>
        <span />
        <span />
      </div>
      <Link href={link} className={styles.card__image}>
        {banner && (
          <Image
            src={banner.location}
            alt={name}
            title={name}
            width={376}
            height={212}
            quality={100}
          />
        )}
      </Link>
      <div className={styles.card__content}>
        <Date date={registeredAt} locale={LocaleEnum.en} />
        <Link href={link} className={classNames(styles.card__title, "h4")}>
          {name}
        </Link>
        <div
          className={styles.card__excerpt}
          dangerouslySetInnerHTML={{
            __html: clip(content, 90, {
              html: true,
              stripTags: ["img", "h1", "h2", "h3"],
              maxLines: 3,
            }),
          }}
        />
        <ReadMore className={styles.card__more} link={link} />
      </div>
    </div>
  );
};

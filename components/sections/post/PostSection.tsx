import React, { FC } from "react";
import { LocaleEnum, PostType } from "../../../utils/api/types";
import { Container } from "../../common/container/container";
import { ButtonBack } from "../../buttons/ButtonBack";
import { convertToDateWithOptions } from "../../../utils/date/convertToDateWithOptions";
import classNames from "classnames";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import { Content } from "../../content/Content";
import { AddPostButton } from "../../buttons/add-post/AddPostButton";
import Image from "next/image";
import { Api } from "../../../utils/api";
import { useRouter } from "next/router";

import styles from "../SimpleSection.module.scss";

export const PostSection: FC<PostType> = ({
  id,
  name,
  nameRu,
  content,
  contentRu,
  registeredAt,
  slug,
  banner,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const userData = useAppSelector(selectUserData);

  const onRemoveClick = async () => {
    await Api().post.removePost(id);
    await router.push(`/news`);
  };

  return (
    <section className={classNames(styles.section, styles.section_article)}>
      {banner && (
        <div className={styles.section__back_wrap}>
          <Image
            className={styles.section__back}
            src={banner.location}
            quality={100}
            alt={name}
            title={name}
            priority={false}
            fill
          />
        </div>
      )}
      <Container>
        <div className={styles.section__head}>
          <ButtonBack />
          {userData && userData.role === "Admin" && (
            <AddPostButton type={"edit"} className={"ml-12"} slug={slug} />
          )}
          {userData && userData.role === "Admin" && (
            <button onClick={onRemoveClick} className={"ml-12 link--blue"}>
              Remove
            </button>
          )}
        </div>
        <h1 className={styles.section__title}>
          {locale === "en" ? name : nameRu}
        </h1>
        <div className={styles.section__date}>
          {convertToDateWithOptions(
            registeredAt,
            locale === "en" ? LocaleEnum.en : LocaleEnum.ru
          )}
        </div>
        <Content
          content={
            locale === "en" ? content : contentRu ? contentRu : "Нет информации"
          }
          className={styles.section__content}
        />
      </Container>
    </section>
  );
};

import React, { FC, useEffect, useState } from "react";
import { Container } from "../../common/container/container";
import { Heading, PostType } from "../../../utils/api/types";
import Image from "next/image";
import { ButtonBack } from "../../buttons/ButtonBack";
import classNames from "classnames";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/slices/user";
import { AddPostButton } from "../../buttons/add-post/AddPostButton";
import { SidebarTOC } from "../../sidebar/SidebarTOC";
import { Content } from "../../content/Content";
import { useRouter } from "next/router";

import styles from "../SimpleSection.module.scss";

export const WikiSection: FC<PostType> = ({
  id,
  registeredAt,
  user,
  updatedAt,
  slug,
  userId,
  banner,
  content,
  name,
  nameRu,
  contentRu,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const userData = useAppSelector(selectUserData);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [headingsRu, setHeadingsRu] = useState<Heading[]>([]);
  const [updatedContent, setUpdatedContent] = useState<string>(content);
  const [updatedContentRu, setUpdatedContentRu] = useState<string>(content);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const h2Elements = doc.getElementsByTagName("h2");
    const extractedHeadings: Heading[] = Array.from(h2Elements).map((h2) => {
      const imgElement = h2.querySelector("img");
      const text = imgElement
        ? imgElement.nextSibling?.textContent || ""
        : h2.textContent || "";
      const image = imgElement ? imgElement.src : undefined;
      let id = text.toLowerCase().replace(/\s+/g, "-");
      id = id.replace(/^-/, ""); // Remove leading hyphen, if any
      h2.setAttribute("id", id);
      return { id, text: text.trim(), image };
    });
    setHeadings(extractedHeadings);
    const updatedContent = doc.body.innerHTML;
    setUpdatedContent(updatedContent);
  }, [content]);

  useEffect(() => {
    const parser = new DOMParser();
    if (contentRu) {
      const docRu = parser.parseFromString(contentRu, "text/html");
      const h2ElementsRu = docRu.getElementsByTagName("h2");
      const extractedHeadingsRu: Heading[] = Array.from(h2ElementsRu).map(
        (h2) => {
          const imgElement = h2.querySelector("img");
          const text = imgElement
            ? imgElement.nextSibling?.textContent || ""
            : h2.textContent || "";
          const image = imgElement ? imgElement.src : undefined;
          let id = text.toLowerCase().replace(/\s+/g, "-");
          id = id.replace(/^-/, ""); // Remove leading hyphen, if any
          h2.setAttribute("id", id);
          return { id, text: text.trim(), image };
        }
      );
      setHeadingsRu(extractedHeadingsRu);
      const updatedContentRu = docRu.body.innerHTML;
      setUpdatedContentRu(updatedContentRu);
    }
  }, [contentRu]);

  return (
    <section className={styles.section}>
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
        </div>
        <h1 className={styles.section__title}>
          {locale === "en" ? name : nameRu}
        </h1>
        <div className={styles.section__wiki}>
          <SidebarTOC items={locale === "en" ? headings : headingsRu} />
          <Content
            className={classNames(
              styles.section__content,
              styles.section__content_wiki,
              "ck-content"
            )}
            content={locale === "en" ? updatedContent : updatedContentRu}
          />
        </div>
      </Container>
    </section>
  );
};

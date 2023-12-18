import React, { FC, useEffect, useRef, useState } from "react";
import { Container } from "../../common/container/container";
import { ButtonBack } from "../../buttons/ButtonBack";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { BannerType } from "../../../utils/api/types";
import { SubmitForm } from "../../buttons/form/SubmitForm";

import styles from "../SimpleSection.module.scss";
import { CreatePostForm } from "../../editor/CreatePostForm";
import { EditPostForm } from "../../editor/EditPostForm";
import { AddPostButton } from "../../buttons/add-post/AddPostButton";
import Spinner from "../../../public/images/icons/spinner.svg";
import { useAppSelector } from "../../../redux/hooks";
import { selectSubmitting } from "../../../redux/slices/common";

interface CreateEditPostProps {
  id?: number;
  title: string;
  name?: string;
  content?: string;
  nameRu?: string;
  contentRu?: string;
  slug?: string;
  banner?: BannerType;
}

export const CreateEditPost: FC<CreateEditPostProps> = ({
  title,
  name,
  nameRu,
  contentRu,
  content,
  id,
  slug,
  banner,
}) => {
  const PostEditor = dynamic(() => import("../../editor/PostEditor"), {
    ssr: false,
  });

  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  const [editorData, setEditorData] = useState<string>(
    content ? content : "<p>Type text here</p>"
  );

  const [editorDataRu, setEditorDataRu] = useState<string>(
    contentRu ? contentRu : "<p>Type text here</p>"
  );

  const handleEditorChange = (v: string) => {
    console.log(v);
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.section__head}>
          <ButtonBack />
        </div>
        <h1 className={"text-center mt-24 h2 mb-24"}>{title}</h1>
        {name && id && slug ? (
          <EditPostForm
            id={id}
            name={name}
            slug={slug}
            banner={banner}
            nameRu={nameRu}
          />
        ) : (
          <CreatePostForm />
        )}
        {locale === "en" ? (
          <PostEditor
            key={"en-content"}
            value={editorData}
            onChange={(v) => {
              handleEditorChange(v);
            }}
          />
        ) : (
          <PostEditor
            key={"ru-content"}
            value={editorDataRu}
            onChange={(v) => {
              handleEditorChange(v);
            }}
          />
        )}

        <div className={styles.section__button}>
          <SubmitForm form={"add-post"} />
        </div>
      </Container>
    </section>
  );
};

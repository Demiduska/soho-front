import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import {
  BannerType,
  CreatePostDto,
  UpdatePostDto,
} from "../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../../utils/validators/validators";
import { isAxiosError } from "axios";
import { Api } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectPostBanner,
  selectPostContent,
  selectPostContentRu,
  setPostBanner,
} from "../../redux/slices/post";
import { setSubmitting } from "../../redux/slices/common";
import Image from "next/image";

import styles from "./CreatePostForm.module.scss";
import { setUserData } from "../../redux/slices/user";

interface EditPostFormProps {
  name: string;
  nameRu?: string;
  id: number;
  slug: string;
  banner?: BannerType;
}

export const EditPostForm: FC<EditPostFormProps> = ({
  name,
  nameRu,
  id,
  slug,
  banner,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPostContent);
  const dataRu = useAppSelector(selectPostContentRu);
  const image = useAppSelector(selectPostBanner);

  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  const [error, setError] = useState<string>("");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdatePostDto>({
    mode: "onChange",
    resolver: yupResolver(createPostFormSchema),
    defaultValues: {
      name,
      nameRu,
      id,
    },
  });

  useEffect(() => {
    setValue("content", data);
  }, [data]);

  useEffect(() => {
    setValue("contentRu", dataRu);
  }, [dataRu]);

  useEffect(() => {
    dispatch(setSubmitting(isSubmitting));
  }, [isSubmitting]);

  // const form = useWatch({ control });
  // console.log(form);

  const onSubmit = async (dto: UpdatePostDto) => {
    console.log(dto);
    setError("");
    try {
      const data = await Api().post.updatePost(
        dto.image
          ? {
              ...dto,
              image: undefined,
              content: locale === "en" ? dto.content : undefined,
              contentRu: locale === "ru" ? dto.contentRu : undefined,
            }
          : dto
      );
      if (dto.image && dto.image.length > 0) {
        const postWithBanner = await Api().post.uploadBanner(
          data.id,
          dto.image
        );
        dispatch(setUserData(postWithBanner.user));
      }
      await router.push(
        { pathname: "/posts/[slug]", query: { slug: slug } },
        `/posts/${slug}`
      );
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
    }
  };

  const deleteBanner = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await Api().post.deleteBanner(id);
    dispatch(setPostBanner(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={"add-post"}>
      <div className={styles.form__banner}>
        {image && (
          <div className={styles.form__banner_image}>
            <Image
              src={image.location}
              quality={100}
              width={700}
              height={460}
              alt={name}
              title={name}
            />
          </div>
        )}
        <label className={styles.form__banner_label}>
          <input type="file" {...register("image")} />
          {image && (
            <a
              className={classNames(styles.form__banner_delete, "link--blue")}
              onClick={deleteBanner}
            >
              Удалить
            </a>
          )}
        </label>
      </div>
      <div>
        {locale === "en" ? (
          <input
            key={"en-title"}
            type={"text"}
            placeholder={"Add title*"}
            className={classNames(
              styles.form__input_title,
              errors?.name && styles.form__input_title_error
            )}
            {...register("name")}
          />
        ) : (
          <input
            key={"ru-title"}
            type={"text"}
            placeholder={"Добавьте заголовок*"}
            className={classNames(
              styles.form__input_title,
              errors?.name && styles.form__input_title_error
            )}
            {...register("nameRu")}
          />
        )}
      </div>
      {locale === "en" ? (
        <input
          key={"en-content"}
          type={"text"}
          style={{ display: "none" }}
          {...register("content")}
          value={data}
        />
      ) : (
        <input
          key={"ru-content"}
          type={"text"}
          style={{ display: "none" }}
          {...register("contentRu")}
          value={dataRu}
        />
      )}

      {error && <div className="text-red">{error}</div>}
    </form>
  );
};

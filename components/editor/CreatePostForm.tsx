import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostDto } from "../../utils/api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../../utils/validators/validators";
import { isAxiosError } from "axios";
import { Api } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectPostContent } from "../../redux/slices/post";
import { setUserData } from "../../redux/slices/user";
import { setSubmitting } from "../../redux/slices/common";

import styles from "./CreatePostForm.module.scss";

export const CreatePostForm: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPostContent);
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [image, setImageName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreatePostDto>({
    mode: "onChange",
    resolver: yupResolver(createPostFormSchema),
  });

  useEffect(() => {
    setValue("content", data);
  }, [data]);

  useEffect(() => {
    dispatch(setSubmitting(isSubmitting));
  }, [isSubmitting]);

  const onChangeInput = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setImageName(
      target?.files && target.files.length > 0 ? target.files[0].name : null
    );
  };

  const onSubmit = async (dto: CreatePostDto) => {
    setError("");
    try {
      const data = await Api().post.createPost(
        dto.image ? { ...dto, image: undefined } : dto
      );
      dispatch(setUserData(data.user));
      if (dto.image && dto.image.length > 0) {
        const postWithBanner = await Api().post.uploadBanner(
          data.id,
          dto.image
        );
        dispatch(setUserData(postWithBanner.user));
      }
      await router.push(`posts/${data.slug}/edit`);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={"add-post"}>
      <div>
        <div className={styles.form__banner}>
          <label className={styles.form__banner_label}>
            <input
              type="file"
              {...register("image")}
              onChange={onChangeInput}
            />
          </label>
        </div>

        <input
          type={"text"}
          placeholder={"Add title*"}
          className={classNames(
            styles.form__input_title,
            errors?.name && styles.form__input_title_error
          )}
          {...register("name")}
        />
      </div>
      <input
        type={"text"}
        style={{ display: "none" }}
        {...register("content")}
        value={data}
      />
      {error && <div className="text-red">{error}</div>}
    </form>
  );
};

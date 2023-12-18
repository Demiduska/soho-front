import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../../../utils/api";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUserData } from "../../../../redux/slices/user";
import { isAxiosError } from "axios";
import { setFormType, setVisibleForm } from "../../../../redux/slices/common";
import { useRouter } from "next/router";
import { LoginDto } from "../../../../utils/api/types";
import { FormViewType } from "../../../../utils/ts/types";
import { LoginFormSchema } from "../../../../utils/validators/validators";
import { batch } from "react-redux";

import styles from "./LoginForm.module.scss";

import Eye from "../../../../public/images/icons/eye.svg";
import Spinner from "../../../../public/images/icons/spinner.svg";

export const LoginForm: FC<FormViewType> = ({
  typeView,
  typeDB = "pq",
  single,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginDto>({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
  });
  const dispatch = useAppDispatch();

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (dto: LoginDto) => {
    try {
      setError("");
      const data = await Api().user.login(dto);
      batch(() => {
        dispatch(setUserData(data));
        dispatch(setVisibleForm(false));
        dispatch(setFormType(null));
      });

      if (typeView === "page") {
        await router.push("/news");
      }
    } catch (err) {
      console.warn("Register error", err);
      if (isAxiosError(err) && err.response) {
        setError(err.response?.data.message);
      }
    }
  };

  return (
    <>
      <div
        className={classNames(
          styles.form_wrap,
          typeView === "page" && styles.form_wrap_page,
          single && styles.form_wrap_page_single
        )}
      >
        <h2 className={classNames(styles.form__title, "mb-24")}>
          Authorization
        </h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="email">
            <div className={styles.form__label_text}>Login</div>
            <input
              type="email"
              placeholder="Email"
              className={classNames("input", {
                "input--error": errors?.email,
              })}
              {...register("email")}
            />
            {errors.email?.message && (
              <span className={classNames("text-red", "text-error")}>
                {errors.email?.message}
              </span>
            )}
          </label>
          <label className={styles.form__label} htmlFor="password">
            <div className={styles.form__label_text}>Password</div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={classNames("input", {
                "input--error": errors?.password,
              })}
              {...register("password")}
            />
            <a
              className={classNames(
                styles.form__show,
                showPassword && "active"
              )}
              onClick={handleClickOnShowPassword}
            >
              <Eye />
            </a>
            {errors.password?.message && (
              <span className={classNames("text-red text-error")}>
                {errors.password?.message}
              </span>
            )}
          </label>
          {error && <div className="mb-20 text-red">{error}</div>}
          <div className={styles.form__buttons}>
            <Link className={styles.form__forgot} href={"/forgot-password"}>
              Forgot password?
            </Link>
            <button
              className={classNames(
                "btn",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
      {single && (
        <div
          className={classNames(
            styles.form__footer,
            typeView === "page" && "w-full"
          )}
        >
          New to the Soho Community?
          <Link className={styles.form__footer_link} href={"/registration"}>
            Register
          </Link>
        </div>
      )}
    </>
  );
};

import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Api } from "../../../../utils/api";
import { setUserData } from "../../../../redux/slices/user";
import axios, { isAxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { RegisterFormSchemaPg } from "../../../../utils/validators/validators";
import { FormTypeEnum, FormViewType } from "../../../../utils/ts/types";
import { Button } from "../../../buttons/Button";
import { setFormTypePage } from "../../../../redux/slices/common";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import { endpoints } from "../../../../utils/constants";
import Link from "next/link";
import { CreateUserDtoPg } from "../../../../utils/api/types";

import styles from "./LoginForm.module.scss";
import Eye from "../../../../public/images/icons/eye.svg";
import Spinner from "../../../../public/images/icons/spinner.svg";

export const RegisterFormPg: FC<FormViewType> = ({ typeView, single }) => {
  const [width, height] = useWindowSize();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateUserDtoPg>({
    mode: "onChange",
    resolver: yupResolver(RegisterFormSchemaPg),
  });
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleClickOnForgotPassword = () => {
    dispatch(setFormTypePage(FormTypeEnum.forgot));
  };

  const onSubmit = async (dto: CreateUserDtoPg) => {
    try {
      setError("");
      if (executeRecaptcha) {
        const token = await executeRecaptcha();
        if (!token) {
          setError("Failed to Send!!!");
          return;
        }
        const captchaResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/recaptcha`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: {
              token: token,
            },
          }
        );

        if (
          process.env.NEXT_PUBLIC_NODE_ENV === "dev" ||
          (captchaResponse.status === 200 &&
            captchaResponse.data.status === "success")
        ) {
          const data = await Api().user.register(dto);
          dispatch(setUserData(data));
        } else {
          setError(captchaResponse.data.message);
        }
      }
    } catch (err) {
      console.warn("Register error", err);
      setError("Smth wrong... Try again");
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
        {!single && width > endpoints.sm && (
          <div className={"subtitle--step text-center"}>step 1</div>
        )}

        <h3 className={classNames(styles.form__title, "mb-sm-12 mb-24")}>
          create an account
        </h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="email">
            <div className={styles.form__label_text}>Email</div>
            <input
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              className={classNames("input", {
                "input--error": errors?.password,
              })}
              {...register("password")}
            />
            <a
              className={classNames(
                showPassword && "active",
                styles.form__show
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
          <label className={styles.form__label} htmlFor="confirmPassword">
            <div className={styles.form__label_text}>Confirm Password</div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={classNames("input", {
                "input--error": errors?.confirmPassword,
              })}
              {...register("confirmPassword")}
            />
            <a
              className={classNames(
                showPassword && "active",
                styles.form__show
              )}
              onClick={handleClickOnShowPassword}
            >
              <Eye />
            </a>
            {errors.confirmPassword?.message && (
              <span className={classNames("text-red text-error")}>
                {errors.confirmPassword?.message}
              </span>
            )}
          </label>

          {error && <div className="mb-20 text-red">{error}</div>}

          <div className={styles.form__button_link}>
            <button onClick={handleClickOnForgotPassword}>
              Forgot password
            </button>
          </div>
          <div className={styles.form__buttons}>
            {/*<button*/}
            {/*  className={classNames(*/}
            {/*    "btn--gold w-full",*/}
            {/*    styles.form__submit,*/}
            {/*    (!isValid || isSubmitting) && "btn-disabled"*/}
            {/*  )}*/}
            {/*  type="submit"*/}
            {/*  disabled={!isValid || isSubmitting}*/}
            {/*>*/}
            {/*  {isSubmitting ? <Spinner /> : "create a gaming account"}*/}
            {/*</button>*/}

            <Button
              className={classNames(
                "btn--gold w-full",
                styles.form__submit,
                (!isValid || isSubmitting) && "btn-disabled"
              )}
              type={"button"}
              typeAction={"submit"}
              style={"symbols"}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "create a gaming account"}
            </Button>
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
          Already have account?
          <Link className={styles.form__footer_link} href={"/login"}>
            Login
          </Link>
        </div>
      )}
    </>
  );
};

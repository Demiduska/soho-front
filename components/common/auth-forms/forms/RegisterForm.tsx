import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { isAxiosError } from "axios";
import { useAppDispatch } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  RegisterFormSchema,
  RegisterFormSchemaRU,
} from "../../../../utils/validators/validators";
import { FormTypeEnum, FormViewType } from "../../../../utils/ts/types";
import {
  CreateGameAccountDto,
  CreateUserDto,
} from "../../../../utils/api/types";
import { Button } from "../../../buttons/Button";
import { setFormTypePage } from "../../../../redux/slices/common";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import { endpoints } from "../../../../utils/constants";
import { Api } from "../../../../utils/api";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";

import styles from "./LoginForm.module.scss";
import Eye from "../../../../public/images/icons/eye.svg";
import Spinner from "../../../../public/images/icons/spinner.svg";

export const RegisterForm: FC<FormViewType> = ({
  typeView,
  single,
  typeDB,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CreateUserDto>({
    mode: "onChange",
    resolver: yupResolver(
      locale === "en" ? RegisterFormSchema : RegisterFormSchemaRU
    ),
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

  const onSubmit = async (dto: CreateGameAccountDto) => {
    // console.log(dto);
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
          await Api().user.registerGameAccount(dto);
          dispatch(setFormTypePage(FormTypeEnum.success));
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
          typeView === "page" && styles.form_wrap_page
        )}
      >
        {width > endpoints.sm && (
          <div className={"subtitle--step text-center"}>
            {localization[locale].step1}
          </div>
        )}

        <h3 className={classNames(styles.form__title, "mb-sm-12 mb-24")}>
          {localization[locale].createAccount}
        </h3>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="login">
            <div className={styles.form__label_text}>
              {localization[locale].login}
            </div>
            <input
              type="login"
              placeholder={localization[locale].loginPlaceholder}
              className={classNames("input", {
                "input--error": errors?.login,
              })}
              {...register("login")}
            />
            {errors.login?.message && (
              <span className={classNames("text-red", "text-error")}>
                {errors.login?.message}
              </span>
            )}
          </label>
          <label className={styles.form__label} htmlFor="email">
            <div className={styles.form__label_text}>
              {localization[locale].email}
            </div>
            <input
              type="email"
              placeholder={localization[locale].emailPlaceholder}
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
            <div className={styles.form__label_text}>
              {localization[locale].password}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={localization[locale].passwordPlaceholder}
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
          {/*<label className={styles.form__label} htmlFor="confirmPassword">*/}
          {/*  <input*/}
          {/*    type={showPassword ? "text" : "password"}*/}
          {/*    placeholder="Confirm password"*/}
          {/*    className={classNames("input", {*/}
          {/*      "input--error": errors?.confirmPassword,*/}
          {/*    })}*/}
          {/*    {...register("confirmPassword")}*/}
          {/*  />*/}
          {/*  <a*/}
          {/*    className={classNames(*/}
          {/*      showPassword && "active",*/}
          {/*      styles.form__show*/}
          {/*    )}*/}
          {/*    onClick={handleClickOnShowPassword}*/}
          {/*  >*/}
          {/*    <Eye />*/}
          {/*  </a>*/}
          {/*  {errors.confirmPassword?.message && (*/}
          {/*    <span className={classNames("text-red text-error")}>*/}
          {/*      {errors.confirmPassword?.message}*/}
          {/*    </span>*/}
          {/*  )}*/}
          {/*</label>*/}

          {error && <div className="mb-20 text-red">{error}</div>}

          <div className={styles.form__button_link}>
            <button onClick={handleClickOnForgotPassword}>
              {localization[locale].forgotPassword}
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
              {isSubmitting ? (
                <Spinner />
              ) : (
                localization[locale].createGamingAccount
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

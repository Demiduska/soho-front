import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SetNewPasswordFormSchema } from "../../../../utils/validators/validators";
import { FormTypeEnum, FormViewType } from "../../../../utils/ts/types";
import { Button } from "../../../buttons/Button";
import { setFormTypePage } from "../../../../redux/slices/common";
import { SetNewPasswordDto } from "../../../../utils/api/types";
import { ButtonBack } from "../../../buttons/ButtonBack";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";
import axios, { isAxiosError } from "axios";
import { Api } from "../../../../utils/api";

import styles from "./LoginForm.module.scss";

import Spinner from "../../../../public/images/icons/spinner.svg";
import Eye from "../../../../public/images/icons/eye.svg";

export const SetNewPasswordForm: FC<FormViewType> = ({ typeView, typeDB }) => {
  const router = useRouter();
  const { token } = router.query;
  const locale: string = router?.locale ? router.locale : "en";
  const [error, setError] = useState<string>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SetNewPasswordDto>({
    mode: "onChange",
    resolver: yupResolver(SetNewPasswordFormSchema),
    defaultValues: {
      token: token,
    },
  });
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClickOnBack = () => {
    dispatch(setFormTypePage(FormTypeEnum.register));
  };

  const handleClickOnShowPassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (dto: SetNewPasswordDto) => {
    console.log(dto);
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
          await Api().user.setNewPassword(dto);
          dispatch(setFormTypePage(FormTypeEnum.successSetNewPassword));
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
        <div className={"d-flex justify-center mb-12"}>
          <ButtonBack onClick={handleClickOnBack} className={"text-center"} />
        </div>
        <h3 className={classNames(styles.form__title, "mb-12")}>
          {localization[locale].createNewPassword}?
        </h3>
        <div className={"text-center mb-24"}>
          {localization[locale].createNewPasswordText}
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("token")} />
          <label className={styles.form__label} htmlFor="password">
            <div className={styles.form__label_text}>
              {localization[locale].newPassword}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={localization[locale].newPasswordPlaceholder}
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
            <div className={styles.form__label_text}>
              {localization[locale].repeatNewPassword}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={localization[locale].repeatNewPasswordPlaceholder}
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
          <div className={styles.form__buttons}>
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
                localization[locale].saveNewPassword
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

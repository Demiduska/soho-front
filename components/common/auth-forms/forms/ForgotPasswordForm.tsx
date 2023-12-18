import React, { FC, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { ForgotPasswordFormSchema } from "../../../../utils/validators/validators";
import { FormTypeEnum, FormViewType } from "../../../../utils/ts/types";
import { Button } from "../../../buttons/Button";
import { setFormTypePage } from "../../../../redux/slices/common";
import { ForgotPasswordDto } from "../../../../utils/api/types";
import { ButtonBack } from "../../../buttons/ButtonBack";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";
import axios, { isAxiosError } from "axios";
import { Api } from "../../../../utils/api";

import styles from "./LoginForm.module.scss";

import Spinner from "../../../../public/images/icons/spinner.svg";

export const ForgotPasswordForm: FC<FormViewType> = ({ typeView, typeDB }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordDto>({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordFormSchema),
  });
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleClickOnBack = () => {
    dispatch(setFormTypePage(FormTypeEnum.register));
  };

  const onSubmit = async (dto: ForgotPasswordDto) => {
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
          await Api().user.forgotPassword(dto);
          dispatch(setFormTypePage(FormTypeEnum.successSentEmail));
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
          {localization[locale].forgotPassword}?
        </h3>
        <div className={"text-center mb-24"}>
          {localization[locale].forgotPasswordContent}
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              {isSubmitting ? <Spinner /> : localization[locale].sendCode}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

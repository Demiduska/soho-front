import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  PaymentFormSchema,
  PaymentFormSchemaRU,
} from "../../../../utils/validators/validators";
import {
  FormViewType,
  PaymentDto,
  PaymentEnum,
} from "../../../../utils/ts/types";
import { Button } from "../../../buttons/Button";
import { selectPaymentMethod } from "../../../../redux/slices/common";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";
import { BonusLevels } from "../../../../utils/bonus-levels";
import { Api } from "../../../../utils/api";
import axios, { isAxiosError } from "axios";

import styles from "./LoginForm.module.scss";

import Spinner from "../../../../public/images/icons/spinner.svg";
import Prime from "../../../../public/images/payments/prime.svg";
import Paygol from "../../../../public/images/payments/paygol.svg";
import Enot from "../../../../public/images/payments/enot.svg";
import Paypalych from "../../../../public/images/payments/paypalich.svg";
import Coin from "../../../../public/images/payments/coinpayments.svg";
import Paypal from "../../../../public/images/payments/paypal.svg";
import Cryptocloud from "../../../../public/images/payments/cryptocloud.svg";
import Link from "next/link";

export const PaymentForm: FC<FormViewType> = ({ typeView, typeDB }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const [error, setError] = useState<string>();
  const [paymentLink, setPaymentLink] = useState<string>();
  const [bonus, setBonus] = useState<number>(0);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PaymentDto>({
    mode: "onChange",
    resolver: yupResolver(
      locale === "en" ? PaymentFormSchema : PaymentFormSchemaRU
    ),
    defaultValues: {
      bonus: bonus,
      amount: 1,
    },
  });
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const paymentMethod = useAppSelector(selectPaymentMethod);

  const watchedAmount: number | undefined = watch("amount");

  useEffect(() => {
    if (watchedAmount !== undefined) {
      const enteredAmount: number = parseFloat(watchedAmount.toString());

      let calculatedBonus = 0;

      for (let level of BonusLevels) {
        if (enteredAmount >= level.min && enteredAmount < level.max) {
          calculatedBonus = Math.round(enteredAmount * level.bonus); // round off to the nearest integer
          break;
        }
      }

      setBonus(calculatedBonus);
    } else {
      setBonus(0);
    }
  }, [watchedAmount]);

  const onSubmit = async (dto: PaymentDto) => {
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
          const payment = await Api().payment.createPayment(dto);
          if (payment.payment_link) {
            router.push(payment.payment_link); // Use router to open the payment link
          }
          setPaymentLink(payment.payment_link);
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
          typeView === "popup" && styles.form_wrap_popup
        )}
      >
        <div className={styles.form__payment}>
          {paymentMethod === PaymentEnum.prime && <Prime />}
          {paymentMethod === PaymentEnum.paypalych && <Paypalych />}
          {paymentMethod === PaymentEnum.enot && <Enot />}
          {paymentMethod === PaymentEnum.paygol && <Paygol />}
          {paymentMethod === PaymentEnum.coin && <Coin />}
          {paymentMethod === PaymentEnum.cryptocloud && <Cryptocloud />}
          {paymentMethod === PaymentEnum.paypal && <Paypal />}
        </div>
        {/*<h3 className={classNames(styles.form__title, "mb-12")}>*/}
        {/*  {localization[locale].internationalBankCards}*/}
        {/*</h3>*/}

        <div className={classNames("text-center mb-24", styles.form__subtitle)}>
          {paymentMethod !== PaymentEnum.paypal
            ? localization[locale].internationalBankCardsDescription
            : localization[locale].paypalDescription}
        </div>

        {paymentMethod === PaymentEnum.paypal ? (
          <div className={"d-flex justify-center"}>
            <Button
              link={"https://discord.gg/soho"}
              className={"btn--gold"}
              type={"link"}
              style={"symbols"}
              target={"_blank"}
            >
              Discord
            </Button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.form__label} htmlFor="login">
              <div className={styles.form__label_text}>
                {localization[locale].gameAccount}
              </div>
              <input
                type="text"
                placeholder={localization[locale].gameAccountPlaceholder}
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
            <label className={styles.form__label} htmlFor="amount">
              <div className={styles.form__label_text}>
                {localization[locale].amount}
              </div>
              <input
                type="number"
                placeholder={localization[locale].amountPlaceholder}
                className={classNames("input", {
                  "input--error": errors?.amount,
                })}
                min={1}
                defaultValue={1}
                {...register("amount")}
              />
              <div className={styles.form__bonus}>
                + {bonus} {localization[locale].bonus}
                <input value={bonus} type="hidden" {...register("bonus")} />
                <input
                  value={paymentMethod || ""}
                  type="hidden"
                  {...register("payment")}
                />
              </div>

              {errors.amount?.message && (
                <span className={classNames("text-red", "text-error")}>
                  {errors.amount?.message}
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
                {isSubmitting ? <Spinner /> : localization[locale].payNow}
              </Button>
            </div>
            {paymentLink && (
              <div
                className={classNames(
                  "mt-24 text-center",
                  styles.form__payment_link
                )}
              >
                Click on the{" "}
                <Link href={paymentLink} target={"_blank"}>
                  payment link
                </Link>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
};

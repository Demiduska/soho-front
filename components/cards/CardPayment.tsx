import React, { FC } from "react";
import { FormTypeEnum, PaymentEnum, PaymentType } from "../../utils/ts/types";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "../buttons/Button";
import { useAppDispatch } from "../../redux/hooks";
import {
  setFormType,
  setPaymentMethod,
  setVisibleForm,
} from "../../redux/slices/common";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";
import { batch } from "react-redux";

import Prime from "../../public/images/payments/prime.svg";
import Paypal from "../../public/images/payments/paypal.svg";
import Enot from "../../public/images/payments/enot.svg";
import Paypalych from "../../public/images/payments/paypalich.svg";
import Coin from "../../public/images/payments/coinpayments.svg";
import Cryptocloud from "../../public/images/payments/cryptocloud.svg";

import styles from "./CardPayment.module.scss";

export const CardPayment: FC<PaymentType> = ({
  title,
  titleRU,
  image,
  background,
  type,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const dispatch = useAppDispatch();
  const handleClickOnButton = () => {
    batch(() => {
      dispatch(setFormType(FormTypeEnum.payment));
      dispatch(setPaymentMethod(type));
      dispatch(setVisibleForm(true));
    });
  };

  return (
    <div className={classNames(styles.card, "card--payment")}>
      <style jsx>{`
        .card--payment {
          background-image: url(${background.src});
        }
      `}</style>
      <div>
        <div className={styles.card__inner}>
          <span />
          <span />
        </div>
        <div className={styles.card__icon}>
          {type === PaymentEnum.prime && <Prime />}
          {type === PaymentEnum.paypalych && <Paypalych />}
          {type === PaymentEnum.enot && <Enot />}
          {type === PaymentEnum.cryptocloud && <Cryptocloud />}
          {type === PaymentEnum.paypal && <Paypal />}
        </div>
        <div className={"text-center"}>{locale === "en" ? title : titleRU}</div>
      </div>
      <div className={styles.card__image}>
        <Image quality={100} src={image} alt={title} title={title} />
      </div>
      <div className={styles.card__button_wrap}>
        <Button
          link={"/"}
          className={"btn--gold"}
          type={"button"}
          style={"symbols"}
          onClick={handleClickOnButton}
        >
          {localization[locale].select}
        </Button>
      </div>
    </div>
  );
};

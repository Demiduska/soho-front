import React, { FC } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";

import styles from "./LoginForm.module.scss";

import Accept from "../../../../public/images/icons/accept.svg";

interface SuccessPaymentProps {
  typeView: "popup" | "page";
}

export const SuccessPayment: FC<SuccessPaymentProps> = ({ typeView }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";

  return (
    <>
      <div
        className={classNames(
          styles.form_wrap,
          typeView === "page" && styles.form_wrap_page
        )}
      >
        <div className={styles.form__icon}>
          <Accept />
        </div>
        <h3 className={classNames(styles.form__title, "mb-12")}>
          {localization[locale].successPaymentTitle}
        </h3>
        <div className={"text-center mb-24"}>
          {localization[locale].successPaymentText}
        </div>
      </div>
    </>
  );
};

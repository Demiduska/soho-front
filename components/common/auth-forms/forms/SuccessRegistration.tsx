import React, { FC } from "react";
import classNames from "classnames";
import { useAppDispatch } from "../../../../redux/hooks";
import { FormTypeEnum, FormViewType } from "../../../../utils/ts/types";
import { setFormTypePage } from "../../../../redux/slices/common";
import { ButtonBack } from "../../../buttons/ButtonBack";
import { useRouter } from "next/router";
import { localization } from "../../../../utils/localization";

import styles from "./LoginForm.module.scss";

import Accept from "../../../../public/images/icons/accept.svg";

interface SuccessRegistrationProps {
  typeView: "popup" | "page";
}

export const SuccessRegistration: FC<SuccessRegistrationProps> = ({
  typeView,
}) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const dispatch = useAppDispatch();

  const handleClickOnBack = () => {
    dispatch(setFormTypePage(FormTypeEnum.register));
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
        <div className={styles.form__icon}>
          <Accept />
        </div>
        <h3 className={classNames(styles.form__title, "mb-12")}>
          {localization[locale].registrationComplete}
        </h3>
        <div className={"text-center mb-24"}>
          {localization[locale].registrationCompleteText}
        </div>
      </div>
    </>
  );
};

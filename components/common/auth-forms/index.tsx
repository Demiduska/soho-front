import React, { FC, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectFormType,
  selectVisibleForm,
  setFormType,
  setVisibleForm,
} from "../../../redux/slices/common";
import { FormTypeEnum } from "../../../utils/ts/types";
import Popup from "../../popup/Popup";
import { VideoPopupCommon } from "../../popup/VideoPopupCommon";
import { PaymentForm } from "./forms/PaymentForm";
import { SuccessPayment } from "./forms/SuccessPayment";
import { FailedPayment } from "./forms/FailedPayment";
import { batch } from "react-redux";

import styles from "./AuthForms.module.scss";

import Close from "../../../public/images/icons/close.svg";

export const AuthForms: FC = () => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const formType = useAppSelector(selectFormType);
  const isVisibleForm = useAppSelector(selectVisibleForm);
  const onClickCloseForm = () => {
    batch(() => {
      dispatch(setFormType(null));
      dispatch(setVisibleForm(false));
    });
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    onClickCloseForm();
  };

  return (
    <>
      {isVisibleForm && (
        <div className={styles.overlay}>
          <motion.div
            className={styles.popup}
            initial={{
              opacity: 0,
              // scale: 0.5,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: 1,
              // scale: 1,
              translateX: "-50%",
              translateY: "-50%",
            }}
            exit={{
              opacity: 0,
              scale: 0,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <button className={styles.popup__close} onClick={onClickCloseForm}>
              <Close />
            </button>
            {formType === FormTypeEnum.video && (
              <Popup>
                <VideoPopupCommon />
              </Popup>
            )}
            {formType === FormTypeEnum.payment && (
              <Popup>
                <PaymentForm typeDB={"sql"} typeView={"popup"} />
              </Popup>
            )}
            {formType === FormTypeEnum.successPayment && (
              <Popup>
                <SuccessPayment typeView={"popup"} />
              </Popup>
            )}
            {formType === FormTypeEnum.failedPayment && (
              <Popup>
                <FailedPayment typeView={"popup"} />
              </Popup>
            )}
          </motion.div>
          <div
            onClick={handleClickOutside}
            className={styles.popup__outside}
            ref={popupRef}
          />
        </div>
      )}
    </>
  );
};

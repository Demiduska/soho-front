import React, { FC, useEffect, useRef, useState } from "react";
import { FPSection } from "./FPSection";
import classNames from "classnames";
import { RegisterForm } from "../common/auth-forms/forms/RegisterForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFormTypePage, setFormTypePage } from "../../redux/slices/common";
import { FormTypeEnum } from "../../utils/ts/types";
import { DownloadFiles } from "../download-files/download-files";
import { ForgotPasswordForm } from "../common/auth-forms/forms/ForgotPasswordForm";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { endpoints } from "../../utils/constants";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./FPSection.module.scss";
import stylesDownload from "./Download.module.scss";
import { SuccessRegistration } from "../common/auth-forms/forms/SuccessRegistration";
import { SuccessSentEmail } from "../common/auth-forms/forms/SuccessSentEmail";
import { SetNewPasswordForm } from "../common/auth-forms/forms/SetNewPasswordForm";
import { SuccessNewPassword } from "../common/auth-forms/forms/SuccessSetNewPassword";

interface DownloadProps {
  anchor: string;
  moveTo: (value: string) => void;
}

export const Download: FC<DownloadProps> = ({ anchor, moveTo }) => {
  const router = useRouter();
  const { form } = router?.query;
  const locale: string = router?.locale ? router.locale : "en";
  const [width, height] = useWindowSize();
  const [step, setStep] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const formTypePage = useAppSelector(selectFormTypePage);
  const dispatch = useAppDispatch();

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  useEffect(() => {
    if (width <= endpoints.sm) {
      setStep(1);
    } else {
      setStep(null);
    }
  }, [width]);

  useEffect(() => {
    if (form === "new-password") {
      dispatch(setFormTypePage(FormTypeEnum.newPassword));
      moveTo("download");
    }
  }, [router.isReady]);

  return (
    <FPSection className={styles.section} anchor={anchor}>
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          poster={"/images/poster/bg4.png"}
          playsInline={true}
        >
          <source src={"/videos/back4.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={styles.section__content}>
        <h2
          className={classNames(
            styles.section__title,
            "h1",
            "mb-sm-24",
            "mb-48",
            "text-center"
          )}
        >
          {localization[locale].download}
        </h2>
        <div className={stylesDownload.section__grid}>
          {width <= endpoints.sm && (
            <div className={stylesDownload.section__steps}>
              <button
                onClick={() => setStep(1)}
                className={classNames(step === 1 && "active")}
              >
                {localization[locale].step1}
              </button>
              <button
                onClick={() => setStep(2)}
                className={classNames(step === 2 && "active")}
              >
                {localization[locale].step2}
              </button>
            </div>
          )}
          {(!step || step === 1) && (
            <div>
              {formTypePage === FormTypeEnum.register && (
                <RegisterForm typeDB={"sql"} typeView={"page"} />
              )}
              {formTypePage === FormTypeEnum.forgot && (
                <ForgotPasswordForm typeDB={"sql"} typeView={"page"} />
              )}
              {formTypePage === FormTypeEnum.success && (
                <SuccessRegistration typeView={"page"} />
              )}
              {formTypePage === FormTypeEnum.successSentEmail && (
                <SuccessSentEmail typeView={"page"} />
              )}
              {formTypePage === FormTypeEnum.newPassword && (
                <SetNewPasswordForm typeView={"page"} typeDB={"sql"} />
              )}
              {formTypePage === FormTypeEnum.successSetNewPassword && (
                <SuccessNewPassword typeView={"page"} />
              )}
            </div>
          )}
          {(!step || step === 2) && (
            <div>
              <DownloadFiles />
            </div>
          )}
        </div>
      </div>
    </FPSection>
  );
};

import React, { FC, useRef } from "react";
import { FPSection } from "./FPSection";
import classNames from "classnames";
import { PaymentEnum, PaymentType } from "../../utils/ts/types";
import { CardPayment } from "../cards/CardPayment";
import { useWindowSize } from "../../utils/hooks/useWindowSize";
import { useRouter } from "next/router";
import { localization } from "../../utils/localization";

import styles from "./FPSection.module.scss";
import stylesDonation from "./Donation.module.scss";

import paymentImage1 from "../../public/images/payments/payment1.png";
import paymentBack1 from "../../public/images/payments/payment1-back.png";
import paymentImage2 from "../../public/images/payments/payment2.png";
import paymentBack2 from "../../public/images/payments/payment2-back.png";
import paymentImage3 from "../../public/images/payments/payment3.png";
import paymentBack3 from "../../public/images/payments/payment3-back.png";
import paymentImage4 from "../../public/images/payments/payment4.png";
import paymentBack4 from "../../public/images/payments/payment4-back.png";
import paymentImage5 from "../../public/images/payments/payment5.png";
import paymentBack5 from "../../public/images/payments/payment5-back.png";
import { endpoints } from "../../utils/constants";
import { SliderPayments } from "../slider/SliderPayments";

interface DonationProps {
  anchor: string;
}

const payments: PaymentType[] = [
  {
    type: PaymentEnum.paypalych,
    title: "VISA, MASTERCARD",
    titleRU: "VISA, MASTERCARD",
    image: paymentImage1,
    background: paymentBack2,
  },
  {
    type: PaymentEnum.enot,
    title: "VISA, MASTERCARD",
    titleRU: "VISA, MASTERCARD",
    image: paymentImage2,
    background: paymentBack3,
  },
  {
    type: PaymentEnum.prime,
    title: "MIR, QIWI, ЮMoney",
    titleRU: "MIR, QIWI, ЮMoney",
    image: paymentImage3,
    background: paymentBack1,
  },
  {
    type: PaymentEnum.cryptocloud,
    title: "UA, EU, USA bank cards, cryptocurrency",
    titleRU: "UA, EU, USA, криптовалюта",
    image: paymentImage4,
    background: paymentBack4,
  },
  {
    type: PaymentEnum.paypal,
    title: "PayPal and Crypto manual mode",
    titleRU: "PayPal и криптовалюта ручной режим",
    image: paymentImage5,
    background: paymentBack5,
  },
];

export const Donation: FC<DonationProps> = ({ anchor }) => {
  const router = useRouter();
  const locale: string = router?.locale ? router.locale : "en";
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [width, height] = useWindowSize();

  const video = videoRef.current;
  if (video && "play" in video) {
    video.play();
  }

  return (
    <FPSection className={stylesDonation.section} anchor={anchor}>
      <div className={styles.section__video}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline={true}
          poster={"/images/poster/bg5.png"}
        >
          <source src={"/videos/back5.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className={styles.section__content}>
        <h2
          className={classNames(
            styles.section__title,
            "h1",
            "mb-sm-12",
            "mb-24",
            "text-center"
          )}
        >
          {localization[locale].donation}
        </h2>
        <h3 className={"text-center"}>
          {localization[locale].donationDescription}
        </h3>
        <div className={stylesDonation.section__wrap}>
          {width > endpoints.xl ? (
            payments.map((item, index) => (
              <CardPayment
                key={index}
                type={item.type}
                image={item.image}
                background={item.background}
                title={item.title}
                titleRU={item.titleRU}
              />
            ))
          ) : (
            <SliderPayments slides={payments} />
          )}
        </div>
      </div>
    </FPSection>
  );
};

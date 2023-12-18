import { FC } from "react";
import { FeaturesIconEnum } from "../../utils/ts/types";
import Image from "next/image";

import Icon_1 from "../../public/images/icons/features/xp.svg";
import Icon_2 from "../../public/images/icons/ic_features2.svg";
import Icon_3 from "../../public/images/icons/features/ic_features3.svg";
import Icon_4 from "../../public/images/icons/features/ic_features4.svg";
import Icon_5 from "../../public/images/icons/features/ic_features5.svg";
import Icon_6 from "../../public/images/icons/features/ic_features6.svg";
import Icon_7 from "../../public/images/icons/features/ic_features7.svg";

import styles from "./IconFeature.module.scss";

interface IconFeatureProps {
  icon: FeaturesIconEnum;
  title: string;
}

export const IconFeature: FC<IconFeatureProps> = ({ icon, title }) => {
  return (
    <div className={styles.icon}>
      <div className={styles.icon__icon}>
        {icon === FeaturesIconEnum.icon_1 && <Icon_1 />}
        {icon === FeaturesIconEnum.icon_2 && <Icon_2 />}
        {icon === FeaturesIconEnum.icon_3 && <Icon_3 />}
        {icon === FeaturesIconEnum.icon_4 && <Icon_4 />}
        {icon === FeaturesIconEnum.icon_5 && <Icon_5 />}
        {icon === FeaturesIconEnum.icon_6 && <Icon_6 />}
        {icon === FeaturesIconEnum.icon_7 && <Icon_7 />}
      </div>
      <div
        className={styles.icon__title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
};

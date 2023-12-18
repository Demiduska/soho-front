import React, { FC } from "react";
import Image from "next/image";
import { useAppDispatch } from "../../redux/hooks";
import {
  setFormType,
  setVideoLink,
  setVisibleForm,
} from "../../redux/slices/common";
import { FormTypeEnum } from "../../utils/ts/types";
import { batch } from "react-redux";

import styles from "./VideoPopupButtonWithPreview.module.scss";

import Video from "../../public/images/video.png";
import Play from "../../public/images/icons/play.svg";

interface VideoPopupButtonWithPreviewProps {
  link: string;
}

export const VideoPopupButtonWithPreview: FC<VideoPopupButtonWithPreviewProps> =
  ({ link }) => {
    const dispatch = useAppDispatch();

    const openPopup = () => {
      batch(() => {
        dispatch(setVisibleForm(true));
        dispatch(setFormType(FormTypeEnum.video));
        dispatch(setVideoLink(link));
      });
    };

    return (
      <>
        <div className={styles.button}>
          <Image width={196} height={108} src={Video} alt={"video"} />
          <div className={styles.button_wrap}>
            <button className={styles.button_button} onClick={openPopup}>
              <Play />
            </button>
          </div>
        </div>
      </>
    );
  };

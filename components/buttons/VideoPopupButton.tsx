import React, { FC } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setFormType,
  setVideoLink,
  setVisibleForm,
} from "../../redux/slices/common";
import { FormTypeEnum } from "../../utils/ts/types";
import { batch } from "react-redux";

import styles from "./VideoPopupButton.module.scss";

import PlayBig from "../../public/images/icons/play-big.svg";

interface VideoPopupButtonProps {
  link: string;
  className?: string;
  width: number;
  height: number;
}

export const VideoPopupButton: FC<VideoPopupButtonProps> = ({
  className,
  link,
  width,
  height,
}) => {
  const dispatch = useAppDispatch();
  const setOpen = () => {
    batch(() => {
      dispatch(setVisibleForm(true));
      dispatch(setFormType(FormTypeEnum.video));
      dispatch(setVideoLink(link));
    });
  };

  return (
    <>
      <div className={styles.button_wrap}>
        <button className={styles.button_button} onClick={setOpen}>
          <PlayBig width={width} height={height} />
        </button>
      </div>
    </>
  );
};

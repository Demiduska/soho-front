import React, { FC } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectVideoLink } from "../../redux/slices/common";

export const VideoPopupCommon: FC = () => {
  const link = useAppSelector(selectVideoLink);

  return (
    <iframe
      width="576"
      height="440"
      src={link}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

import React, { FC } from "react";
import classNames from "classnames";

type ContainerProps = {
  children: React.ReactNode;
  fluid?: boolean;
};

export const Container: FC<ContainerProps> = ({ children, fluid }) => {
  return (
    <div className={classNames(fluid ? "container-fluid" : "container")}>
      {children}
    </div>
  );
};

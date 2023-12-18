import React, { FC } from "react";
import classNames from "classnames";
import { Container } from "../common/container/container";

import styles from "./FPSection.module.scss";

type FPSectionProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  anchor: string;
};

export const FPSection: FC<FPSectionProps> = ({
  children,
  className,
  anchor,
  container = true,
}) => {
  return (
    <section
      data-anchor={anchor}
      className={classNames("section", className && className, styles.section)}
    >
      {!container ? children : <Container>{children}</Container>}
    </section>
  );
};

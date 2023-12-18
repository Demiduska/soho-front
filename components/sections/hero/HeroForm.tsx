import React from "react";
import classNames from "classnames";
import Link from "next/link";

import styles from "./HeroForm.module.scss";
import Logo from "../../../public/images/logo.svg";

export default function HeroForm({ children }: { children: React.ReactNode }) {
  return (
    <section className={classNames(styles.hero, "hero__form")}>
      {children}
    </section>
  );
}

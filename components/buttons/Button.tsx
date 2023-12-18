import React, { FC, ReactElement, ReactSVGElement } from "react";
import Link from "next/link";
import classNames from "classnames";

import styles from "./Button.module.scss";

import L from "../../public/images/icons/l.svg";
import R from "../../public/images/icons/r.svg";

interface ButtonProps {
  type: "link" | "button";
  style: "symbols" | "transparent";
  className?: string;
  children: React.ReactNode;
  link?: string;
  icon?: ReactSVGElement | ReactElement;
  typeAction?: "submit";
  disabled?: boolean;
  target?: "_blank";
  onClick?: () => void;
  useNextLink?: boolean;
}

export const Button: FC<ButtonProps> = ({
  type,
  className,
  children,
  link,
  style,
  icon,
  typeAction,
  disabled,
  target,
  onClick,
  useNextLink = true,
  ...props
}) => {
  return (
    <>
      {type === "link" && useNextLink && (
        <Link
          className={classNames(
            styles.button,
            `btn--${style}`,
            icon && "btn--icon",
            className && className
          )}
          href={link ? link : "/"}
          target={target}
          {...props}
        >
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_left
              )}
            >
              <L />
            </span>
          )}
          {icon && icon}
          {children}
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_right
              )}
            >
              <R />
            </span>
          )}
        </Link>
      )}
      {type === "link" && !useNextLink && (
        <a
          className={classNames(
            styles.button,
            `btn--${style}`,
            icon && "btn--icon",
            className && className
          )}
          href={link ? link : "/"}
          target={target}
          {...props}
        >
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_left
              )}
            >
              <L />
            </span>
          )}
          {icon && icon}
          {children}
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_right
              )}
            >
              <R />
            </span>
          )}
        </a>
      )}
      {type === "button" && (
        <button
          className={classNames(
            styles.button,
            `btn--${style}`,
            icon && "btn--icon",
            className && className
          )}
          type={typeAction ? typeAction : undefined}
          onClick={onClick}
          disabled={disabled ? disabled : undefined}
        >
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_left
              )}
            >
              <L />
            </span>
          )}
          {icon && icon}
          {children}
          {style === "symbols" && (
            <span
              className={classNames(
                styles.button__symbol,
                styles.button__symbol_right
              )}
            >
              <R />
            </span>
          )}
        </button>
      )}
    </>
  );
};

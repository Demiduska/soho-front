import { FC } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import Link from "next/link";

import styles from "./AddPostButton.module.scss";

import Add from "../../../public/images/icons/add.svg";

interface AddEditPostButtonProps {
  type: "create" | "edit";
  slug?: string;
  className?: string;
}

export const AddPostButton: FC<AddEditPostButtonProps> = ({
  className,
  type = "create",
  slug,
}) => {
  return (
    <Link
      href={type === "create" ? "/create" : `/posts/${slug}/edit`}
      className={classNames(styles.button, className && className)}
    >
      <Add /> {type === "create" ? "Create a post" : " Edit post"}
    </Link>
  );
};

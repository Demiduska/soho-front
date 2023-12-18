import { FC } from "react";
import classNames from "classnames";

import styles from "./Pagination.module.scss";

import ChevronRight from "../../public/images/icons/chevron-right.svg";
import ChevronLeft from "../../public/images/icons/chevron-left.svg";
import DoubleChevronLeft from "../../public/images/icons/double-chevron-left.svg";
import DoubleChevronRight from "../../public/images/icons/double-chevron-right.svg";

interface PaginationProps {
  className?: string;
  limit: number;
  count: number;
  onClick: (num: number) => void;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = ({
  className,
  limit,
  onClick,
  count,
  currentPage,
}) => {
  const totalPages = Math.ceil(count / limit);

  return (
    <ul className={classNames(className && className, styles.pagination)}>
      <button
        className={classNames(styles.pagination__item)}
        key={"first"}
        onClick={() => onClick(1)}
        disabled={currentPage === 1}
      >
        <DoubleChevronLeft />
      </button>
      <button
        className={classNames(styles.pagination__item)}
        key={"prev"}
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>
      {totalPages > 3 && currentPage > 3 && (
        <span className={styles.pagination__item}>...</span>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          className={classNames(
            styles.pagination__item,
            currentPage === pageNum && styles.pagination__item_active
          )}
          key={pageNum}
          onClick={() => onClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      {totalPages > 3 && currentPage < totalPages - 2 && (
        <span className={styles.pagination__item}>...</span>
      )}
      <button
        className={classNames(styles.pagination__item)}
        key={"next"}
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
      <button
        className={classNames(styles.pagination__item)}
        key={"last"}
        onClick={() => onClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        <DoubleChevronRight />
      </button>
    </ul>
  );
};

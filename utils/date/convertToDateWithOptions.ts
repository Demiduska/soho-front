import { LocaleEnum } from "../api/types";

export const convertToDateWithOptions = (
  date: string | Date,
  locale: LocaleEnum | string
): string => {
  return new Date(date).toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

import Spinner from "../../../public/images/icons/spinner.svg";
import React, { FC } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectSubmitting } from "../../../redux/slices/common";

interface SubmitFormProps {
  form: string;
}

export const SubmitForm: FC<SubmitFormProps> = ({ form }) => {
  const isSubmitting = useAppSelector(selectSubmitting);

  return (
    <button
      type={"submit"}
      form={form}
      disabled={isSubmitting}
      className={"btn"}
    >
      {isSubmitting ? <Spinner /> : "Save"}
    </button>
  );
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FormTypeEnum, PaymentEnum } from "../../utils/ts/types";

export interface CommonState {
  visibleForm: boolean;
  videoLink: string;
  formType: FormTypeEnum | null;
  formTypePage: FormTypeEnum | null;
  paymentMethod: PaymentEnum | null;
  isSubmitting: boolean;
}

const initialState: CommonState = {
  visibleForm: false,
  videoLink: "",
  formType: null,
  formTypePage: FormTypeEnum.register,
  paymentMethod: null,
  isSubmitting: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setVisibleForm: (state, action: PayloadAction<boolean>) => {
      state.visibleForm = action.payload;
    },
    setVideoLink: (state, action: PayloadAction<string>) => {
      state.videoLink = action.payload;
    },
    setFormType: (state, action: PayloadAction<FormTypeEnum | null>) => {
      state.formType = action.payload;
    },
    setFormTypePage: (state, action: PayloadAction<FormTypeEnum | null>) => {
      state.formTypePage = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentEnum | null>) => {
      state.paymentMethod = action.payload;
    },
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export const {
  setVisibleForm,
  setVideoLink,
  setFormType,
  setPaymentMethod,
  setFormTypePage,
  setSubmitting,
} = commonSlice.actions;

export const selectVisibleForm = (state: RootState) => state.common.visibleForm;

export const selectVideoLink = (state: RootState) => state.common.videoLink;

export const selectFormType = (state: RootState) => state.common.formType;

export const selectFormTypePage = (state: RootState) =>
  state.common.formTypePage;

export const selectPaymentMethod = (state: RootState) =>
  state.common.paymentMethod;

export const selectSubmitting = (state: RootState) => state.common.isSubmitting;

export const commonReducer = commonSlice.reducer;

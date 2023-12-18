import { AxiosInstance } from "axios";
import { PaymentDto, ResponsePaymentDto } from "../ts/types";

export const PaymentApi = (instance: AxiosInstance) => ({
  async createPayment(dto: PaymentDto) {
    const { data } = await instance.post<
      PaymentDto,
      { data: ResponsePaymentDto }
    >("/payments", dto);
    return data;
  },
});

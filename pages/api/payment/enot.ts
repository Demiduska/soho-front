import { NextApiRequest, NextApiResponse } from "next";
import { ConfirmPaymentDto } from "../../../utils/api/types";
import { PaymentEnum } from "../../../utils/ts/types";
import axios from "axios";

type PaymentEnotPayload = {
  invoice_id: string;
  status: "success" | "fail";
  invoice_amount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Type check the request body
    const data: PaymentEnotPayload = req.body;

    // Extract status from query parameters
    const status = req.query.status as string;

    // Determine status and process accordingly
    switch (status) {
      case "result":
        if (data.status === "success") {
          try {
            const dto: ConfirmPaymentDto = {
              payment: PaymentEnum.enot,
              transaction_id: data.invoice_id,
            };
            await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/confirm`,
              dto
            );
            res.status(200).json({ message: "Success" });
          } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Error" });
          }
        }
        break;
      case "success":
        // Handle successful payment
        res.status(200).json({ message: "Payment successful." });
        break;
      case "failure":
        // Handle failed payment
        res.status(400).json({ message: "Payment failed." });
        break;
      default:
        res.status(400).json({ message: "Invalid status." });
        return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

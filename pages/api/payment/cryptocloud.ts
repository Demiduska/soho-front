import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ConfirmPaymentDto } from "../../../utils/api/types";
import { PaymentEnum } from "../../../utils/ts/types";

type PaymentCryptoCloudPayload = {
  status: string;
  invoice_id: string;
  amount_crypto: number;
  currency: string;
  order_id: string;
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Extract status from query parameters
    const status = req.query.status as string;

    // Determine status and process accordingly
    switch (status) {
      case "success":
        // Redirect to the specified URL
        res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}?payment=success`);
        break;
      case "failure":
        // Handle failed payment
        res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}?payment=failure`);
        break;
      default:
        res.status(400).json({ message: "Invalid status." });
        return;
    }
  } else if (req.method === "POST") {
    // Type check the request body
    const data: PaymentCryptoCloudPayload = req.body;

    // Extract status from query parameters
    const status = req.query.status as string;

    switch (status) {
      case "result":
        // Handle successful payment
        if (data.invoice_id) {
          try {
            const dto: ConfirmPaymentDto = {
              payment: PaymentEnum.cryptocloud,
              transaction_id: data.invoice_id,
            };
            const invoiceData = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/confirm`,
              dto
            );
            res.status(200).json({ message: "Ok" });
          } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Error" });
          }
        }

        break;
      default:
        res.status(400).json({ message: "Invalid status." });
        return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

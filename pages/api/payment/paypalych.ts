import { NextApiRequest, NextApiResponse } from "next";
import { ConfirmPaymentDto } from "../../../utils/api/types";
import { PaymentEnum } from "../../../utils/ts/types";
import axios from "axios";

type PaymentPaypalychPayload = {
  InvId: number;
  OutSum: number;
  CurrencyIn: string;
  Commission: number;
  TrsId: string;
  Status: "SUCCESS" | "UNDERPAID" | "OVERPAID" | "FAIL";
  SignatureValue: string;
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
    const data: PaymentPaypalychPayload = req.body;

    // Extract status from query parameters
    const status = req.query.status as string;

    // Determine status and process accordingly
    switch (status) {
      case "result":
        // Handle successful payment
        if (data.Status === "SUCCESS") {
          try {
            const dto: ConfirmPaymentDto = {
              payment: PaymentEnum.paypalych,
              transaction_id: data.TrsId,
            };
            const invoiceData = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payments/confirm`,
              dto
            );
            res.status(200).json({ message: "OK" });
          } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Error" });
          }
        }
        break;
      case "success":
        // Handle successful payment
        res.redirect(
          303,
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}?payment=success`
        );
        break;
      case "failure":
        // Handle failed payment
        res.redirect(
          303,
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}?payment=failure`
        );
        break;
      default:
        res.status(400).json({ message: "Invalid status." });
        return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

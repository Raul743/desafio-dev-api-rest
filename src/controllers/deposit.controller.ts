import { Request, Response } from "express";
import { AppResponse } from "../@types/data";
import { Contas } from "../entity/Contas";
import DepositService from "../services/deposit.service";

interface IDeposityBody {
  amount: number;
  accountId: string;
}

export default class DepositController {
  async handle(
    req: Request<any, any, IDeposityBody>,
    res: Response<AppResponse<Contas>>
  ) {
    const { amount, accountId } = req.body;
    const depositService = new DepositService();

    try {
      const account = await depositService.execute({ amount, accountId });

      return res.status(200).json({
        success: true,
        data: account,
        message: "Deposit done sucessful",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

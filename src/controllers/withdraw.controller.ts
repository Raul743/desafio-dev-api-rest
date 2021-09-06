import { Request, Response } from "express";
import { AppResponse } from "../@types/data";
import { Contas } from "../entity/Contas";
import WithdrawService from "../services/withdraw.service";

interface IWithdrawBody {
  amount: number;
  accountId: string;
}

export default class WithdrawController {
  async handle(
    req: Request<any, any, IWithdrawBody>,
    res: Response<AppResponse<Contas>>
  ) {
    const { amount, accountId } = req.body;
    const withdrawService = new WithdrawService();

    try {
      const account = await withdrawService.execute({ amount, accountId });

      return res.status(200).json({
        success: true,
        data: account,
        message: "Withdraw done sucessful",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

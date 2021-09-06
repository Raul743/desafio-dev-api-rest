import { Request, Response } from "express";
import { AppResponse } from "../@types/data";
import { Contas } from "../entity/Contas";
import CreateAccountService from "../services/createAccount.service";

interface ICreateAccountBody {
  personId: string;
  dailyDrawalLimit: number;
  activeFlag: "Activo" | "Inactiva";
  accountTypeId: string;
}

export default class CreateAccountController {
  async handle(
    req: Request<any, any, ICreateAccountBody>,
    res: Response<AppResponse<Contas>>
  ) {
    const { personId, dailyDrawalLimit, accountTypeId, activeFlag } = req.body;
    const createAccountService = new CreateAccountService();

    try {
      const account = await createAccountService.execute({
        personId,
        dailyDrawalLimit,
        activeFlag,
        accountTypeId,
      });

      return res.status(201).json({
        success: true,
        data: account,
        message: "Account created sucessful",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

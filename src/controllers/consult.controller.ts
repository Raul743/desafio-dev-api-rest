import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppResponse } from "../@types/data";
import { Contas } from "../entity/Contas";

interface IConsultParams {
  id: string;
}

export default class ConsultController {
  async handle(
    req: Request<IConsultParams>,
    res: Response<AppResponse<string>>
  ) {
    const { id } = req.params;

    try {
      const account = await getRepository(Contas)
        .createQueryBuilder("account")
        .where("account.id = :id", { id })
        .getOne();

      if (!account) {
        return res.status(500).json({
          success: false,
          message: "Account not found",
        });
      }

      if (account.flagat !== "Activo") {
        return res.status(500).json({
          success: false,
          message: "This account is bloacked",
        });
      }

      return res.status(200).json({
        success: true,
        data: "Balance available: " + account.saldo,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

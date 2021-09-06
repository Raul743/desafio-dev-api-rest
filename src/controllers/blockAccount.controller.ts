import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { AppResponse } from "../@types/data";
import { Contas } from "../entity/Contas";
import AccountRepository from "../repositories/account.repository";

interface IBlockAccountParams {
  id: string;
}

export default class BlockAccountController {
  async handle(
    req: Request<IBlockAccountParams>,
    res: Response<AppResponse<Contas>>
  ) {
    const { id } = req.params;
    const accountRepository = getCustomRepository(AccountRepository);

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

      account.flagat = "Inactiva";

      await accountRepository.save(account);

      return res.status(200).json({
        success: true,
        data: account,
        message: "Account bloacked sucessful",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

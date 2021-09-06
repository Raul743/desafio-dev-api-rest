import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppResponse } from "../@types/data";
import { Transacoes } from "../entity/Transacoes";

interface IExtractParams {
  id: string;
}

export default class ExtractController {
  async handle(
    req: Request<IExtractParams>,
    res: Response<AppResponse<Transacoes[]>>
  ) {
    const { id } = req.params;

    try {
      const extracts = await getRepository(Transacoes)
        .createQueryBuilder("transaction")
        .where("transaction.conta_id = :id", { id })
        .getMany();

      return res.status(200).json({
        success: true,
        data: extracts,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

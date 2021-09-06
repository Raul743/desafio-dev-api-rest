import { Request, Response } from "express";
import { AppResponse } from "../@types/data";
import { Pessoas } from "../entity/Pessoas";
import CreatePersonService from "../services/createPerson.service";

interface ICreatePersonBody {
  name: string;
  cpf: string;
  birthday: string;
}

export default class CreatePersonController {
  async handle(
    req: Request<any, any, ICreatePersonBody>,
    res: Response<AppResponse<Pessoas>>
  ) {
    const { name, cpf, birthday } = req.body;
    const createPersonService = new CreatePersonService();

    try {
      const person = await createPersonService.execute({ name, cpf, birthday });

      return res.status(201).json({
        success: true,
        data: person,
        message: "User created sucessful",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

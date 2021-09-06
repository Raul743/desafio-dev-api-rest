import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const createPersonMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().min(2).required(),
      cpf: yup.string().required(),
      birthday: yup.date(),
    });

    await schema.validate(req.body);

    next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({ success: false, message: err.message });
    }

    return res
      .status(500)
      .json({ success: false, message: "Fail to request process" });
  }
};

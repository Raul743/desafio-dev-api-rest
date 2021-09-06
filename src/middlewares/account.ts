import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const createAccountMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = yup.object().shape({
      personId: yup.string().required(),
      dailyDrawalLimit: yup.number().required(),
      activeFlag: yup.string().required(),
      accountTypeId: yup.string().required(),
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

export const operationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = yup.object().shape({
      amount: yup.number().min(0).required(),
      accountId: yup.string().required(),
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

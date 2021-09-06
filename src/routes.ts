import { Router } from "express";
import BlockAccountController from "./controllers/blockAccount.controller";
import ConsultController from "./controllers/consult.controller";

import CreateAccountController from "./controllers/createAccount.controller";
import CreatePersonController from "./controllers/createPerson.controller";
import DepositController from "./controllers/deposit.controller";
import ExtractController from "./controllers/extract.controller";
import WithdrawController from "./controllers/withdraw.controller";

import {
  createPersonMiddleware,
  createAccountMiddleware,
  operationMiddleware,
} from "./middlewares";

const router = Router();

const createPersonController = new CreatePersonController();
const createAccountController = new CreateAccountController();
const depositController = new DepositController();
const withdrawController = new WithdrawController();
const consultController = new ConsultController();
const blockAccountController = new BlockAccountController();
const extractController = new ExtractController();

router.post("/people", createPersonMiddleware, createPersonController.handle);

router.post(
  "/account",
  createAccountMiddleware,
  createAccountController.handle
);
router.get("/account/:id/consult", consultController.handle);
router.get("/account/:id/block", blockAccountController.handle);
router.get("/account/:id/extract", extractController.handle);

router.put("/deposit", operationMiddleware, depositController.handle);
router.put("/withdraw", operationMiddleware, withdrawController.handle);

export default router;

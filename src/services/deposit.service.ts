import { getCustomRepository } from "typeorm";
import AccountRepository from "../repositories/account.repository";
import SaveTransactionService from "./saveTransaction.service";

interface IDeposit {
  amount: number;
  accountId: string;
}

export default class DepositService {
  async execute({ amount, accountId }: IDeposit) {
    const accountRepository = getCustomRepository(AccountRepository);
    const saveTransaction = new SaveTransactionService();

    try {
      if (amount < 0) {
        throw new Error("Negative amount");
      }

      const account = await accountRepository.findOne({ id: accountId });

      if (!account) {
        throw new Error("Account not exists");
      }

      if (account.flagat !== "Activo") {
        throw new Error("This account is blocked");
      }

      account.saldo = Number(account.saldo) + amount;

      await saveTransaction.execute({
        accountId,
        operation: "deposit",
        value: amount,
      });

      return await accountRepository.save(account);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

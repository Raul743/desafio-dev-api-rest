import { getCustomRepository } from "typeorm";
import { Transacoes } from "../entity/Transacoes";
import OperationRepository from "../repositories/operation.repository";
import TransactionRepository from "../repositories/transaction.repository";

interface ISaveTransaction {
  accountId: string;
  operation: string;
  value: number;
}

export default class SaveTransactionService {
  async execute({ accountId, value, operation }: ISaveTransaction) {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const operationRepository = getCustomRepository(OperationRepository);

    try {
      const op = await operationRepository.findOne({ operacao: operation });

      if (!op) {
        throw new Error("Fail to save transaction");
      }

      const transaction = new Transacoes();

      transaction.contaId = accountId;
      transaction.valor = value;
      transaction.operacao = op;

      return await transactionRepository.save(transaction);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

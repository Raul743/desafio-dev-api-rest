import { getCustomRepository } from "typeorm";
import { Contas } from "../entity/Contas";
import AccountRepository from "../repositories/account.repository";
import AccountTypeRepository from "../repositories/accountType.repository";
import PeopleRepository from "../repositories/people.repository";

interface ICreateAccount {
  personId: string;
  dailyDrawalLimit: number;
  activeFlag: "Activo" | "Inactiva";
  accountTypeId: string;
}

export default class CreateAccountService {
  async execute({
    personId,
    dailyDrawalLimit,
    accountTypeId,
    activeFlag,
  }: ICreateAccount) {
    const personRepository = getCustomRepository(PeopleRepository);
    const accountRepository = getCustomRepository(AccountRepository);
    const accountTypeRepository = getCustomRepository(AccountTypeRepository);

    try {
      const person = await personRepository.findOne({ id: personId });
      const accountType = await accountTypeRepository.findOne({
        id: accountTypeId,
      });

      if (!person) {
        throw new Error("Person not exists");
      }

      if (!accountType) {
        throw new Error("Account type not exists");
      }

      const account = new Contas();
      account.pessoa = person;
      account.saldo = 0;
      account.limitesaquediario = dailyDrawalLimit;
      account.tipoConta = accountType;
      account.flagat = activeFlag;

      return await accountRepository.save(account);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

import { getCustomRepository } from "typeorm";
import { Pessoas } from "../entity/Pessoas";
import PeopleRepository from "../repositories/people.repository";

interface ICreatePerson {
  name: string;
  cpf: string;
  birthday: string;
}

export default class CreatePersonService {
  async execute({ name, cpf, birthday }: ICreatePerson) {
    const peopleRepository = getCustomRepository(PeopleRepository);

    try {
      const personExists = await peopleRepository.findOne({ cpf });

      if (personExists) {
        throw new Error("CPF already registered");
      }

      const person = new Pessoas();
      person.nome = name;
      person.cpf = cpf;
      person.dataNascimento = birthday;

      return await peopleRepository.save(person);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

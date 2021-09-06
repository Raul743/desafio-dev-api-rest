import { EntityRepository, Repository } from "typeorm";
import { Contas } from "../entity/Contas";

@EntityRepository(Contas)
export default class AccountRepository extends Repository<Contas> {}

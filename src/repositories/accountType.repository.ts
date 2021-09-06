import { EntityRepository, Repository } from "typeorm";
import { Tipoconta } from "../entity/Tipoconta";

@EntityRepository(Tipoconta)
export default class AccountTypeRepository extends Repository<Tipoconta> {}

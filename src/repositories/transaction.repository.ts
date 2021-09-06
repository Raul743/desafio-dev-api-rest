import { EntityRepository, Repository } from "typeorm";
import { Transacoes } from "../entity/Transacoes";

@EntityRepository(Transacoes)
export default class TransactionRepository extends Repository<Transacoes> {}

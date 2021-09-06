import { EntityRepository, Repository } from "typeorm";
import { Operacoes } from "../entity/Operacoes";

@EntityRepository(Operacoes)
export default class OperationRepository extends Repository<Operacoes> {}

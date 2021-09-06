import { EntityRepository, Repository } from "typeorm";
import { Pessoas } from "../entity/Pessoas";

@EntityRepository(Pessoas)
export default class PeopleRepository extends Repository<Pessoas> {}

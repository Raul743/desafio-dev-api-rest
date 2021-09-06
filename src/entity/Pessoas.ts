import { Column, Entity, Index, OneToMany } from "typeorm";
import { Contas } from "./Contas";

@Index("pessoa_pkey", ["id"], { unique: true })
@Entity("pessoas", { schema: "public" })
export class Pessoas {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "nome", length: 50 })
  nome: string;

  @Column("character varying", { name: "cpf", nullable: true, length: 14 })
  cpf: string | null;

  @Column("date", { name: "data_nascimento", nullable: true })
  dataNascimento: string | null;

  @Column("timestamp without time zone", {
    name: "data_criacao",
    nullable: true,
    default: () => "now()",
  })
  dataCriacao: Date | null;

  @OneToMany(() => Contas, (contas) => contas.pessoa)
  contas: Contas[];
}

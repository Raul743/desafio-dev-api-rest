import { Column, Entity, Index, OneToMany } from "typeorm";
import { Contas } from "./Contas";

@Index("tipoconta_pkey", ["id"], { unique: true })
@Entity("tipoconta", { schema: "public" })
export class Tipoconta {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "conta", nullable: true, length: 50 })
  conta: string | null;

  @Column("timestamp without time zone", {
    name: "data_criacao",
    nullable: true,
    default: () => "now()",
  })
  dataCriacao: Date | null;

  @OneToMany(() => Contas, (contas) => contas.tipoConta)
  contas: Contas[];
}

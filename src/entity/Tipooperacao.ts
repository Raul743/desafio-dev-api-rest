import { Column, Entity, Index, OneToMany } from "typeorm";
import { Operacoes } from "./Operacoes";

@Index("tipooperacao_pkey", ["id"], { unique: true })
@Entity("tipooperacao", { schema: "public" })
export class TipoOperacao {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "operacao", length: 50 })
  operacao: string;

  @Column("character varying", { name: "tipo_operacao", length: 50 })
  tipoOperacao: string;

  @Column("timestamp without time zone", {
    name: "data_criacao",
    nullable: true,
    default: () => "now()",
  })
  dataCriacao: Date | null;

  @OneToMany(() => Operacoes, (operacoes) => operacoes.tipoOperacao)
  operacoes: Operacoes[];
}

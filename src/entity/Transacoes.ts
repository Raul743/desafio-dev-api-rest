import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Operacoes } from "./Operacoes";

@Index("transacoes_pkey", ["id"], { unique: true })
@Entity("transacoes", { schema: "public" })
export class Transacoes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("uuid", { name: "conta_id" })
  contaId: string;

  @Column("numeric", { name: "valor" })
  valor: number;

  @Column("timestamp without time zone", {
    name: "data_transacao",
    default: () => "now()",
  })
  dataTransacao: Date;

  @Column("timestamp without time zone", {
    name: "data_criacao",
    nullable: true,
    default: () => "now()",
  })
  dataCriacao: Date | null;

  @ManyToOne(() => Operacoes, (operacoes) => operacoes.transacoes)
  @JoinColumn([{ name: "operacao_id", referencedColumnName: "id" }])
  operacao: Operacoes;
}

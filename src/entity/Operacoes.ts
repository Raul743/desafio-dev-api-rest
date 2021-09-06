import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { TipoOperacao } from "./Tipooperacao";
import { Transacoes } from "./Transacoes";

@Index("operacoes_pkey", ["id"], { unique: true })
@Entity("operacoes", { schema: "public" })
export class Operacoes {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "operacao", length: 50 })
  operacao: string;

  @Column("timestamp without time zone", {
    name: "data_criacao",
    nullable: true,
    default: () => "now()",
  })
  dataCriacao: Date | null;

  @ManyToOne(() => TipoOperacao, (tipooperacao) => tipooperacao.operacoes)
  @JoinColumn([{ name: "tipo_operacao_id", referencedColumnName: "id" }])
  tipoOperacao: TipoOperacao;

  @OneToMany(() => Transacoes, (transacoes) => transacoes.operacao)
  transacoes: Transacoes[];
}

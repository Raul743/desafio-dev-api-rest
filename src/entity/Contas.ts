import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Pessoas } from "./Pessoas";
import { Tipoconta } from "./Tipoconta";

@Index("contas_pkey", ["id"], { unique: true })
@Entity("contas", { schema: "public" })
export class Contas {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("numeric", { name: "saldo" })
  saldo: number;

  @Column("numeric", { name: "limitesaquediario", nullable: true })
  limitesaquediario: number | null;

  @Column("enum", {
    name: "flagat",
    enum: ["Activo", "Inactiva"],
    default: () => "'Activo'",
  })
  flagat: "Activo" | "Inactiva";

  @Column("timestamp without time zone", {
    name: "data_criacao",
    default: () => "now()",
  })
  dataCriacao: Date;

  @ManyToOne(() => Pessoas, (pessoas) => pessoas.contas)
  @JoinColumn([{ name: "pessoa_id", referencedColumnName: "id" }])
  pessoa: Pessoas;

  @ManyToOne(() => Tipoconta, (tipoconta) => tipoconta.contas)
  @JoinColumn([{ name: "tipo_conta_id", referencedColumnName: "id" }])
  tipoConta: Tipoconta;
}

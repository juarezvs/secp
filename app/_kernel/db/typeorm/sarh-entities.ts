import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "SARH_SERVIDOR" })
export class SarhServidor {
  @PrimaryColumn({ name: "MATRICULA" })
  matricula!: string;

  @Column({ name: "NOME" })
  nome!: string;

  @Column({ name: "EMAIL" })
  email!: string;
}

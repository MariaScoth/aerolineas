import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import {Cobertura} from 'src/Cobertura/cobertura.entity';

@Entity()
export class Aeropuerto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  pais: string;

  @Column()
  ciudad: string;

  @OneToMany(() => Cobertura, cobertura => cobertura.aeropuerto)
  coberturas: Cobertura[];
}
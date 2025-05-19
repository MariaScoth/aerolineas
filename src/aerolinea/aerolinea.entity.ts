import { Cobertura } from 'src/Cobertura/cobertura.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { AerolineaOfAeropuerto } from './AerolineaOfAeropuerto/AerolineaOfAeropuerto.entity';

@Entity()
export class Aerolinea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  
  @Column()
  descripcion: string;

  @Column({ type: 'date' })
  fechaFundacion: Date;

  @Column()
  paginaWeb: string;

  @OneToMany(() => Cobertura, cobertura => cobertura.aerolinea)
  coberturas: Cobertura[];
}

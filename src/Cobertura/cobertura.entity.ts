import { Aerolinea } from 'src/aerolinea/aerolinea.entity';
import { Aeropuerto } from 'src/aeropuerto/aeropuerto.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
//import { Aerolinea } from 'src/aerolinea/aerolinea.entity';
//import { Aeropuerto } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class Cobertura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aerolinea, aerolinea => aerolinea.coberturas)
  aerolinea: Aerolinea;

  @ManyToOne(() => Aeropuerto, aeropuerto => aeropuerto.coberturas)
  aeropuerto: Aeropuerto;
}
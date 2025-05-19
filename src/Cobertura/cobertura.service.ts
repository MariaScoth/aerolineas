import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aerolinea } from 'src/aerolinea/aerolinea.entity';
import { Aeropuerto } from 'src/aeropuerto/aeropuerto.entity';
import { Cobertura } from './cobertura.entity'; 
import { In } from 'typeorm';// ajusta la ruta si es distinta

@Injectable()
export class CoberturaService {
  constructor(
    @InjectRepository(Cobertura)
    private coberturaRepository: Repository<Cobertura>,

    @InjectRepository(Aerolinea)
    private aerolineaRepository: Repository<Aerolinea>,

    @InjectRepository(Aeropuerto)
    private aeropuertoRepository: Repository<Aeropuerto>,
  ) {}

  // 1. Asociar un aeropuerto a una aerolínea
  async addAirportToAirline(id: number, aeropuertoId: number): Promise<void> {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id: id } });
    const aeropuerto = await this.aeropuertoRepository.findOne({ where: { id: aeropuertoId } });

    if (!aerolinea || !aeropuerto) {
      throw new Error('Aerolinea o Aeropuerto no encontrado');
    }

    const nuevaCobertura = this.coberturaRepository.create({
      aerolinea,
      aeropuerto,
    });
    
    await this.coberturaRepository.save(nuevaCobertura);
  }

  // 2. Obtener los aeropuertos que cubre una aerolínea
  async findAirportsFromAirline(aerolineaId: number): Promise<Aeropuerto[]> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['coberturas', 'coberturas.aeropuerto'], // importante para acceder al aeropuerto
    });
  
    if (!aerolinea) {
      throw new Error('Aerolínea no encontrada');
    }
  
    // Extraer los aeropuertos desde las coberturas
    return aerolinea.coberturas.map(cobertura => cobertura.aeropuerto);
  }

  // 3. Obtener un aeropuerto específico de una aerolínea
  async findAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<Aeropuerto> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['coberturas', 'coberturas.aeropuerto'],
    });
  
    if (!aerolinea) {
      throw new Error('Aerolínea no encontrada');
    }
  
    const cobertura = aerolinea.coberturas.find(c => c.aeropuerto.id === aeropuertoId);
  
    if (!cobertura) {
      throw new Error('Este aeropuerto no está asociado a esta aerolínea');
    }
  
    return cobertura.aeropuerto;
  }

  // 4. Actualizar los aeropuertos que cubre una aerolínea
  async updateAirportsFromAirline(aerolineaId: number, aeropuertoIds: number[]): Promise<void> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['coberturas'],
    });
  
    if (!aerolinea) {
      throw new Error('Aerolínea no encontrada');
    }
  
    // Eliminar coberturas actuales
    await this.coberturaRepository.delete({ aerolinea: { id: aerolineaId } });
  
    // Buscar los aeropuertos nuevos
    const aeropuertos = await this.aeropuertoRepository.findBy({ id: In(aeropuertoIds) });
  
    if (aeropuertos.length !== aeropuertoIds.length) {
      throw new Error('Algunos aeropuertos no existen');
    }
  
    // Crear nuevas coberturas
    const nuevasCoberturas = aeropuertos.map((aeropuerto) =>
      this.coberturaRepository.create({ aerolinea, aeropuerto })
    );
  
    await this.coberturaRepository.save(nuevasCoberturas);
  }

  // 5. Eliminar los aeropuertos que cubre una aerolínea
  async deleteAirportFromAirline(aerolineaId: number, aeropuertoId: number): Promise<void> {
    const aerolinea = await this.aerolineaRepository.findOne({
      where: { id: aerolineaId },
      relations: ['coberturas', 'coberturas.aeropuerto'],
    });
  
    if (!aerolinea) {
      throw new Error('Aerolínea no encontrada');
    }
  
    const cobertura = aerolinea.coberturas.find(c => c.aeropuerto.id === aeropuertoId);
  
    if (!cobertura) {
      throw new Error('Este aeropuerto no está asociado a esta aerolínea');
    }
  
    await this.coberturaRepository.delete(cobertura.id);
  }
  
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aeropuerto } from './aeropuerto.entity';
import { AeropuertoDto } from './aeropuerto.dto';
import { UpdateAeropuertoDto } from './updateAeropuerto.dto';

@Injectable()
export class AeropuertoService {
    constructor(
        @InjectRepository(Aeropuerto)
        private aeropuertoRepository: Repository<Aeropuerto>,
    ) { }

    async findAll(): Promise<Aeropuerto[]> {
        return this.aeropuertoRepository.find();
    }

    async findOne(id: number): Promise<Aeropuerto> {
        const aeropuerto = await this.aeropuertoRepository.findOne({ where: { id } });

        if (!aeropuerto) {
            throw new Error('Aeropuerto no encontrado');
        }

        // Aquí TypeScript ya sabe que `aeropuerto` es del tipo correcto
        return aeropuerto;

    }

    async create(createAeropuertoDto: AeropuertoDto): Promise<Aeropuerto> {
        const { codigo } = createAeropuertoDto;

        // Validar que el código del aeropuerto tenga 3 caracteres
        if (codigo.length !== 3) {
            throw new Error('El código del aeropuerto debe tener exactamente 3 caracteres');
        }

        const aeropuerto = this.aeropuertoRepository.create(createAeropuertoDto);
        return this.aeropuertoRepository.save(aeropuerto);
    }

    async update(id: number, updateAeropuertoDto: UpdateAeropuertoDto): Promise<Aeropuerto> {
        const { codigo } = updateAeropuertoDto;

        // Validar que el código del aeropuerto tenga 3 caracteres
        if (codigo && codigo.length !== 3) {
            throw new Error('El código del aeropuerto debe tener exactamente 3 caracteres');
        }

        await this.aeropuertoRepository.update(id, updateAeropuertoDto);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.aeropuertoRepository.delete(id);
    }
}
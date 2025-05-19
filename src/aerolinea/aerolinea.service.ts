import { Injectable, NotFoundException, BadRequestException , HttpStatus,HttpException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aerolinea } from './aerolinea.entity';
import { AerolineaDto } from './aerolinea.dto';
import { UpdateAerolineaDto } from './updateAerolinea.dto';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(Aerolinea)
    private aerolineaRepository: Repository<Aerolinea>,
  ) {}

  // Obtener todas las aerolíneas
  async findAll(): Promise<Aerolinea[]> {
    return this.aerolineaRepository.find();
  }

  // Obtener una aerolínea por su ID
  async findOne(id: number): Promise<Aerolinea> {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id } });
  
    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }
  
    return aerolinea;
  }

  // Crear una nueva aerolínea
  async create(createAerolineaDto: AerolineaDto): Promise<Aerolinea> {
    const { fechaFundacion } = createAerolineaDto;
    
    // Validar que la fecha de fundación sea en el pasado
    if (new Date(fechaFundacion) > new Date()) {
      throw new BadRequestException('La fecha de fundación debe ser en el pasado');
    }

    const aerolinea = this.aerolineaRepository.create(createAerolineaDto);
    return this.aerolineaRepository.save(aerolinea);
  }

  // Actualizar una aerolínea por su ID
  async update(id: number, updateAerolineaDto: UpdateAerolineaDto): Promise<Aerolinea> {
    const { fechaFundacion } = updateAerolineaDto;
  
    // Validar que la fecha de fundación sea en el pasado
    if (fechaFundacion && new Date(fechaFundacion) > new Date()) {
      throw new BadRequestException('La fecha de fundación debe ser en el pasado');
    }
  
    // Verificar si la aerolínea existe antes de intentar actualizarla
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id } });
    if (!aerolinea) {
      throw new NotFoundException('Aerolínea no encontrada');
    }
  
    // Actualizar la aerolínea
    const updatedAerolinea = Object.assign(aerolinea, updateAerolineaDto);
    return this.aerolineaRepository.save(updatedAerolinea);
  }

  // Eliminar una aerolínea por su ID
  async delete(id: number): Promise<void> {
    const result = await this.aerolineaRepository.delete(id);
    
    if (result.affected === 0) {
      throw new HttpException('Aerolínea no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}
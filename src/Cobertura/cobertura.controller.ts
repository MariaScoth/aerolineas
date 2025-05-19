import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { AerolineaService } from 'src/aerolinea/aerolinea.service';
import { AeropuertoService } from 'src/aeropuerto/aeropuerto.service';
import { CoberturaService } from './cobertura.service';

@Controller('airlines/:aerolineaId/airports') // Ruta base para la asociación
export class AerolineaAeropuertoController {
  constructor(
    private readonly coberturaService: CoberturaService,
    private readonly aerolineaService: AerolineaService,
    private readonly aeropuertoService: AeropuertoService,
  ) {}

  // Agregar un aeropuerto a una aerolínea
  @Post(':aeropuertoId')
  async addAirportToAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ) {
    return this.coberturaService.addAirportToAirline(aerolineaId, aeropuertoId);
  }

  // Obtener todos los aeropuertos de una aerolínea
  @Get()
  async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: number) {
    return this.coberturaService.findAirportsFromAirline(aerolineaId);
  }

  // Obtener un aeropuerto específico que cubre una aerolínea
  @Get(':aeropuertoId')
  async findAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ) {
    return this.coberturaService.findAirportFromAirline(
      aerolineaId,
      aeropuertoId,
    );
  }

  // Actualizar los aeropuertos de una aerolínea
  @Put()
  async updateAirportsFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Body() aeropuertoIds: number[], // Se espera un array de ids de aeropuertos
  ) {
    return this.coberturaService.updateAirportsFromAirline(
      aerolineaId,
      aeropuertoIds,
    );
  }

  // Eliminar un aeropuerto de una aerolínea
  @Delete(':aeropuertoId')
  async deleteAirportFromAirline(
    @Param('aerolineaId') aerolineaId: number,
    @Param('aeropuertoId') aeropuertoId: number,
  ) {
    return this.coberturaService.deleteAirportFromAirline(
      aerolineaId,
      aeropuertoId,
    );
  }
}
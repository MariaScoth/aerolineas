import { Controller, Get, Param, Post, Body, Put, Delete ,ParseIntPipe  } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoDto } from './aeropuerto.dto';
import { UpdateAeropuertoDto } from './updateAeropuerto.dto';


@Controller('airports') // Ruta base para Aeropuerto
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  // Obtener todos los aeropuertos
  @Get()
  findAll() {
    return this.aeropuertoService.findAll();
  }

  // Obtener un aeropuerto por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.aeropuertoService.findOne(id);
  }

  // Crear un nuevo aeropuerto
  @Post()
  create(@Body() createAeropuertoDto: AeropuertoDto) {
    return this.aeropuertoService.create(createAeropuertoDto);
  }

  // Actualizar un aeropuerto por su ID
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAeropuertoDto: UpdateAeropuertoDto,
  ) {
    return this.aeropuertoService.update(id, updateAeropuertoDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.aeropuertoService.delete(id);
  }
}
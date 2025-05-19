import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode , HttpStatus,NotFoundException} from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { AerolineaDto } from './aerolinea.dto';
import { UpdateAerolineaDto } from './updateAerolinea.dto';

@Controller('airlines') // Ruta base para Aerolinea
export class AerolineaController {
  constructor(private readonly aerolineaService: AerolineaService) {}

  // Obtener todas las aerolíneas
  @Get()
  findAll() {
    return this.aerolineaService.findAll();
  }

  // Obtener una aerolínea por su ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.aerolineaService.findOne(id);
  }

  // Crear una nueva aerolínea
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAerolineaDto: AerolineaDto) {
    const result =  this.aerolineaService.create(createAerolineaDto);
   
    return {
      message: 'Aerolínea creada exitosamente',
      data: result,
    };
  }

  // Actualizar una aerolínea por su ID
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAerolineaDto: UpdateAerolineaDto,
  ) {
    try {
      const result =  this.aerolineaService.update(id, updateAerolineaDto);
      return {
        message: '✅ Aerolínea actualizada correctamente',
        data: result,
      };
    } catch (error) {
      // Si el error es una excepción de NestJS como NotFoundException, la devolvemos tal cual
      if (error instanceof NotFoundException) {
        return {
          message: error.message, // "Aerolínea no encontrada"
          statusCode: 404,
        };
      }
  
      // Otros errores
      console.error('❌ Error inesperado:', error.message);
      return {
        message: '❌ Error inesperado al actualizar la aerolínea',
        statusCode: 500,
      };
    }
  }


  // Eliminar una aerolínea por su ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    const result = this.aerolineaService.delete(id);
    return result
  }
}
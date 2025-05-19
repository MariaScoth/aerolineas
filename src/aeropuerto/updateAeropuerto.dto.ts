import { PartialType } from '@nestjs/mapped-types';
import { AeropuertoDto } from './aeropuerto.dto';
import { IsOptional, IsString, IsDateString, } from 'class-validator';

export class UpdateAeropuertoDto  {
     @IsOptional()
      @IsString()
       nombre: string;

       @IsOptional()
       @IsString()
       codigo: string;
     
       @IsOptional()
       @IsString()
       pais: string;
     
       @IsOptional()
       @IsString()
       ciudad: string;
}
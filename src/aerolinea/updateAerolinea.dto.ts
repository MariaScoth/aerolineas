import { PartialType } from '@nestjs/mapped-types';
import { AerolineaDto } from './aerolinea.dto';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateAerolineaDto {
    
        @IsOptional()
        @IsString()
        nombre?: string;
      
        @IsOptional()
        @IsString()
        descripcion?: string;
      
        @IsOptional()
        @IsDateString()
        fechaFundacion?: string;
      
        @IsOptional()
        @IsString()
        paginaWeb?: string;
      
}
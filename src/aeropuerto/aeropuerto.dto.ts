import { IsString, Length } from 'class-validator';

export class AeropuertoDto {
  @IsString()
  nombre: string;

  @IsString()
  @Length(3, 3, { message: 'El código debe tener exactamente 3 caracteres' })
  codigo: string;

  @IsString()
  pais: string;

  @IsString()
  ciudad: string;
}
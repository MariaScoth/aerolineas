import { IsString, IsNotEmpty, MaxLength,IsDateString } from 'class-validator';

export class AerolineaDto {

  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El descripcion no puede estar vacío' })
  @MaxLength(50, { message: 'El descripcion no puede tener más de 50 caracteres' })
  descripcion: string;

  @IsDateString()
  fechaFundacion: string;

 

 
}

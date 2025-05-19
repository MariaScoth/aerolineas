import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cobertura } from './cobertura.entity';
import { AerolineaAeropuertoController } from './cobertura.controller';
import { CoberturaService } from './cobertura.service';
import { AerolineaModule } from 'src/aerolinea/aerolinea.module';
import { AeropuertoModule } from 'src/aeropuerto/aeropuerto.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cobertura]), AerolineaModule,AeropuertoModule],
  exports: [TypeOrmModule,CoberturaService],
  controllers:[AerolineaAeropuertoController],
  providers:[CoberturaService]
})
export class CoberturaModule {}
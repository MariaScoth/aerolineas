import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from './aeropuerto.entity';
import { AeropuertoController } from './aeropuerto.controller';
import { AeropuertoService } from './aeropuerto.service';


@Module({
  imports: [TypeOrmModule.forFeature([Aeropuerto])],
  exports: [TypeOrmModule,AeropuertoService],
  controllers:[AeropuertoController],
  providers:[AeropuertoService]
})

export class AeropuertoModule {}
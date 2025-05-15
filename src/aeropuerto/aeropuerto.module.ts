import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aeropuerto } from './aeropuerto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aeropuerto])],
  exports: [TypeOrmModule],
})
export class AeropuertoModule {}
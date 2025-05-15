import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aerolinea])],
  exports: [TypeOrmModule],
})
export class AerolineaModule {}
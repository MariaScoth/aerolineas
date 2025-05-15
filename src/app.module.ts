// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea/aerolinea.entity';
import { Aeropuerto } from './aeropuerto/aeropuerto.entity';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Aerolinea, Aeropuerto],
      synchronize: true,
    }),
    AerolineaModule,
    AeropuertoModule,
  ],
})
export class AppModule {}
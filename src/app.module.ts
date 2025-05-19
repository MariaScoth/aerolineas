import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea/aerolinea.entity';
import { Aeropuerto } from './aeropuerto/aeropuerto.entity';
import { Cobertura } from './Cobertura/cobertura.entity';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { CoberturaModule } from './Cobertura/cobertura.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maria123',
      password: 'maria123',
      database: 'cobertura',
      entities: [Aerolinea, Aeropuerto, Cobertura],
      synchronize: true,
    }),
    AerolineaModule,
    AeropuertoModule,
    CoberturaModule,
  ],
})
export class AppModule {}

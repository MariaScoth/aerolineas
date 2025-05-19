/* tslint:disable:no-unused-variable */
import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoService } from './aeropuerto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aeropuerto } from './aeropuerto.entity';
import { Repository } from 'typeorm';
import { AeropuertoDto } from './aeropuerto.dto';
import { UpdateAeropuertoDto } from './updateAeropuerto.dto';

const mockAeropuerto = {
  id: 1,
  nombre: 'Aeropuerto Internacional',
  codigo: 'ABC',
  ciudad: 'Ciudad',
  pais: 'Colombia'
};

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repo: Repository<Aeropuerto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AeropuertoService,
        {
          provide: getRepositoryToken(Aeropuerto),
          useValue: {
            find: jest.fn().mockResolvedValue([mockAeropuerto]),
            findOne: jest.fn().mockResolvedValue(mockAeropuerto),
            create: jest.fn().mockReturnValue(mockAeropuerto),
            save: jest.fn().mockResolvedValue(mockAeropuerto),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repo = module.get<Repository<Aeropuerto>>(getRepositoryToken(Aeropuerto));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() should return array of aeropuertos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockAeropuerto]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('findOne() should return one aeropuerto', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockAeropuerto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('create() should validate and create aeropuerto', async () => {
    const dto: AeropuertoDto = {
      nombre: 'Nuevo Aeropuerto',
      ciudad: 'Ciudad Nueva',
      codigo: 'XYZ',
      pais: 'Pais'
    };
    const result = await service.create(dto);
    expect(result).toEqual(mockAeropuerto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('create() should throw error for invalid code', async () => {
    const dto: AeropuertoDto = {
      nombre: 'Aeropuerto',
      ciudad: 'Ciudad',
      codigo: 'XX',
      pais: 'pais'
    };
    await expect(service.create(dto)).rejects.toThrow('El código del aeropuerto debe tener exactamente 3 caracteres');
  });

  it('update() should update and return aeropuerto', async () => {
    const dto: UpdateAeropuertoDto = { codigo: 'DEF' };
    const result = await service.update(1, dto);
    expect(result).toEqual(mockAeropuerto);
    expect(repo.update).toHaveBeenCalledWith(1, dto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('delete() should call delete method', async () => {
    await service.delete(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
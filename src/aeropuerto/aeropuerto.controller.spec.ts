import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoService } from './aeropuerto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aeropuerto } from './aeropuerto.entity';
import { Repository } from 'typeorm';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repo: Repository<Aeropuerto>;

  const mockAeropuerto = {
    id: 1,
    nombre: 'El Dorado',
    ciudad: 'Bogotá',
    codigo: 'BOG',
    pais: 'Colombia',
  };

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockAeropuerto]),
    findOne: jest.fn().mockResolvedValue(mockAeropuerto),
    create: jest.fn().mockReturnValue(mockAeropuerto),
    save: jest.fn().mockResolvedValue(mockAeropuerto),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AeropuertoService,
        {
          provide: getRepositoryToken(Aeropuerto),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repo = module.get<Repository<Aeropuerto>>(getRepositoryToken(Aeropuerto));
  });

  it('debe retornar todos los aeropuertos', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockAeropuerto]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('debe retornar un aeropuerto por id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockAeropuerto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('debe crear un aeropuerto', async () => {
    const dto = { ...mockAeropuerto };
    const result = await service.create(dto);
    expect(result).toEqual(mockAeropuerto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(mockAeropuerto);
  });

  it('debe actualizar un aeropuerto', async () => {
    await service.update(1, { nombre: 'Nuevo Dorado' });
    expect(repo.update).toHaveBeenCalledWith(1, { nombre: 'Nuevo Dorado' });
  });

  it('debe eliminar un aeropuerto', async () => {
    await service.delete(1);
    expect(repo.delete).toHaveBeenCalledWith(1);
  });
});
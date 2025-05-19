import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaService } from './aerolinea.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aerolinea } from './aerolinea.entity';
import { Repository } from 'typeorm';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repo: Repository<Aerolinea>;

  const mockAerolinea = {
    id: 1,
    nombre: 'Avianca',
    descripcion: 'Aerolínea colombiana',
    fechaFundacion: new Date('1990-01-01'),
    paginaWeb: 'www.google.com'
  };

  const mockRepo = {
    find: jest.fn().mockResolvedValue([mockAerolinea]),
    findOne: jest.fn().mockResolvedValue(mockAerolinea),
    create: jest.fn().mockReturnValue(mockAerolinea),
    save: jest.fn().mockResolvedValue(mockAerolinea),
    update: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AerolineaService,
        {
          provide: getRepositoryToken(Aerolinea),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repo = module.get<Repository<Aerolinea>>(getRepositoryToken(Aerolinea));
  });

  it('debería crear una aerolínea', async () => {
    const dto = { mockAerolinea };
    const result = await service.create(dto);
    expect(result).toEqual(mockAerolinea);
    expect(repo.create).toHaveBeenCalledWith(dto);
  });

  it('debería obtener todas las aerolíneas', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockAerolinea]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('debería obtener una aerolínea por ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockAerolinea);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AerolineaAeropuertoController } from './cobertura.controller';
import { CoberturaService } from './cobertura.service';
import { AerolineaService } from 'src/aerolinea/aerolinea.service';
import { AeropuertoService } from 'src/aeropuerto/aeropuerto.service';

describe('AerolineaAeropuertoController', () => {
  let controller: AerolineaAeropuertoController;
  let coberturaService: CoberturaService;

  const mockCoberturaService = {
    addAirportToAirline: jest.fn(),
    findAirportsFromAirline: jest.fn(),
    findAirportFromAirline: jest.fn(),
    updateAirportsFromAirline: jest.fn(),
    deleteAirportFromAirline: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AerolineaAeropuertoController],
      providers: [
        { provide: CoberturaService, useValue: mockCoberturaService },
        { provide: AerolineaService, useValue: {} },
        { provide: AeropuertoService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AerolineaAeropuertoController>(AerolineaAeropuertoController);
    coberturaService = module.get<CoberturaService>(CoberturaService);
  });

  it('should add an airport to an airline', async () => {
    mockCoberturaService.addAirportToAirline.mockResolvedValue('Added');
    expect(await controller.addAirportToAirline(1, 2)).toBe('Added');
  });

  it('should get all airports from an airline', async () => {
    const airports = [{ id: 1, nombre: 'Aeropuerto A' }];
    mockCoberturaService.findAirportsFromAirline.mockResolvedValue(airports);
    expect(await controller.findAirportsFromAirline(1)).toEqual(airports);
  });

  it('should get a specific airport from an airline', async () => {
    const airport = { id: 2, nombre: 'Aeropuerto B' };
    mockCoberturaService.findAirportFromAirline.mockResolvedValue(airport);
    expect(await controller.findAirportFromAirline(1, 2)).toEqual(airport);
  });

  it('should update airports from an airline', async () => {
    const updated = ['updated'];
    mockCoberturaService.updateAirportsFromAirline.mockResolvedValue(updated);
    expect(await controller.updateAirportsFromAirline(1, [2, 3])).toEqual(updated);
  });

  it('should delete an airport from an airline', async () => {
    mockCoberturaService.deleteAirportFromAirline.mockResolvedValue('Deleted');
    expect(await controller.deleteAirportFromAirline(1, 2)).toBe('Deleted');
  });
});
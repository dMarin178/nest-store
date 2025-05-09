import { Test, TestingModule } from '@nestjs/testing';
import { BrandController } from './brands.controller';
import { BrandsService } from 'src/services/brands/brands.service';

describe('BrandController', () => {
  let controller: BrandController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandController],
      providers: [BrandsService]
    }).compile();

    controller = module.get<BrandController>(BrandController);
    service =  module.get<BrandsService>(BrandsService);
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const result = ['test'];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);
      expect(await controller.findAll()).toBe(result);
    });
  })

});

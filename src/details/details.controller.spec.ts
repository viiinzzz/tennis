import { Test, TestingModule } from '@nestjs/testing';
import { DetailsController } from './details.controller';

describe('DetailsController', () => {
  let c: DetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsController],
    }).compile();

    c = module.get<DetailsController>(DetailsController);
  });

  it('should be defined', () => {
    expect(c).toBeDefined();
  });
});

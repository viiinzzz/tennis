import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';

describe('PlayerController', () => {
  let c: StatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
    }).compile();

    c = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(c).toBeDefined();
  });
});

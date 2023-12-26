import { Filtering } from '@decorators/filtering.decorator';
import { FarmRepository } from '@repositories/farm.repository';

jest.mock('@app/core/repositories/farm.repository.ts');

let farmRepository: jest.Mocked<FarmRepository>;

beforeEach(() => {
  farmRepository = <jest.Mocked<FarmRepository>>new (<new () => FarmRepository>FarmRepository)();
});

describe('Farm Repository', () => {
  it('Create Farm', async () => {
    // Given
    farmRepository.getFarm.mockResolvedValue({
      data: undefined,
      message: '',
      success: true,
      status: 200,
    });
    // When
    const filter: Filtering = {
      value: 'test',
      rule: '==',
      property: 'name',
    };
    const farm = await farmRepository.getFarm(filter);

    // Then
    expect(farmRepository.getFarm).toHaveBeenCalledTimes(1);
    expect(farm).toStrictEqual({
      data: undefined,
      message: '',
      success: true,
      status: 200,
    });
  });
});

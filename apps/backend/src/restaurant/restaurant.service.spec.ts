import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { RestaurantService } from './restaurant.service';
import { UserService } from '../user/user.service';
import { RestaurantTag } from '../types/dtos/restaurant-tag.dto';
import { UserDtoRoleEnum } from 'frontend/src/api';

describe('RestaurantService', () => {
  let restaurantService: RestaurantService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, RestaurantService, PrismaService],
    }).compile();

    restaurantService = module.get<RestaurantService>(RestaurantService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should create a restaurant and update user role to OWNER', async () => {
    const mockUser = {
      id: 'mockUserId',
      name: 'John Doe',
      email: 'johndoe@email.com',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      image: 'https://example.com/image.jpg',
      role: 'CUSTOMER' as UserDtoRoleEnum,
      ratings: [],
    };

    jest.spyOn(userService, 'create').mockResolvedValue(mockUser);

    const user = await userService.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      image: 'https://example.com/image.jpg',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@email.com');
    expect(user.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(user.image).toBe('https://example.com/image.jpg');
    expect(user.role).toBe('CUSTOMER');

    const mockRestaurant = {
      id: 'mockRestaurantId',
      name: 'John Doe Restaurant',
      description: 'Best restaurant in town',
      image: 'https://example.com/restaurant.jpg',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      tags: ['JAPANESE', 'VEGAN'] as RestaurantTag[],
      ownerId: 'mockUserId',
      ratings: [],
    };

    jest.spyOn(restaurantService, 'create').mockResolvedValue(mockRestaurant);

    const restaurant = await restaurantService.create(user.id, {
      name: 'John Doe Restaurant',
      description: 'Best restaurant in town',
      image: 'https://example.com/restaurant.jpg',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      tags: ['JAPANESE', 'VEGAN'],
    });

    expect(restaurant).toBeDefined();
    expect(restaurant.name).toBe('John Doe Restaurant');
    expect(restaurant.description).toBe('Best restaurant in town');
    expect(restaurant.image).toBe('https://example.com/restaurant.jpg');
    expect(restaurant.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(restaurant.tags).toEqual(['JAPANESE', 'VEGAN']);

    const updatedUser = { ...mockUser, role: 'OWNER' as UserDtoRoleEnum };
    jest.spyOn(userService, 'findOne').mockResolvedValue(updatedUser);

    const userRole = await userService.findOne(user.id);

    expect(userRole).toBeDefined();
    expect(userRole.role).toBe('OWNER');

    jest.spyOn(restaurantService, 'remove').mockResolvedValue(undefined);
    jest.spyOn(userService, 'remove').mockResolvedValue(undefined);

    await restaurantService.remove(restaurant.id);
    await userService.remove(user.id);
  });
});

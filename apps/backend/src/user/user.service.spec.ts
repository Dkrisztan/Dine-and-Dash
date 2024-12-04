import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from './user.service';
import { UpdateUserDto } from '../types/dtos/user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('create a user and check for role', async () => {
    const user = await service.create({
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

    await service.remove(user.id);
  });

  it('create and update a user', async () => {
    const user = await service.create({
      name: 'John Doe',
      email: 'johndoe2@email.com',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      image: 'https://example.com/image.jpg',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe2@email.com');
    expect(user.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(user.image).toBe('https://example.com/image.jpg');
    expect(user.role).toBe('CUSTOMER');

    const updatedUser = await service.update(user.id, {
      name: 'Jane Doe Too',
    } as UpdateUserDto);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('Jane Doe Too');
    expect(updatedUser.email).toBe('johndoe2@email.com');
    expect(updatedUser.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(updatedUser.image).toBe('https://example.com/image.jpg');
    expect(updatedUser.role).toBe('CUSTOMER');

    await service.remove(updatedUser.id);
  });

  it('user becomes courier', async () => {
    const user = await service.create({
      name: 'John Doe',
      email: 'johndoe3@email.com',
      addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
      image: 'https://example.com/image.jpg',
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe3@email.com');
    expect(user.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(user.image).toBe('https://example.com/image.jpg');
    expect(user.role).toBe('CUSTOMER');

    const updatedUser = await service.becomeCourier(user.id);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('johndoe3@email.com');
    expect(updatedUser.addresses).toEqual(['1010 Budapest, Kossuth Lajos utca 1.']);
    expect(updatedUser.image).toBe('https://example.com/image.jpg');
    expect(updatedUser.role).toBe('COURIER');

    await service.remove(updatedUser.id);
  });
});

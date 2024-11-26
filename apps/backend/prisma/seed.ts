import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const MockUser = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  phone: '+3620404040',
  addresses: ['1093, Budapest, Közraktár u. 4.'],
};

const MockCart = {
  total: 0,
};

const MockFood = {
  name: 'Hamburger',
  price: 1000,
  description: 'Delicious hamburger',
  image: 'https://example.com/hamburger.jpg',
};

const MockOrder = {
  total: 0,
};

const MockRestaurant = {
  name: 'McDonalds',
  description: 'Fast food restaurant',
  addresses: ['1093, Budapest, Közraktár u. 38.'],
};

async function main() {
  const user = await client.user.create({ data: MockUser });
  const cart = await client.cart.create({ data: { ...MockCart, userId: user.id } });
  const restaurant = await client.restaurant.create({ data: { ...MockRestaurant, ownerId: user.id } });
  const food = await client.food.create({ data: { ...MockFood, restaurantId: restaurant.id } });
  const order = await client.order.create({
    data: {
      ...MockOrder,
      userId: user.id,
      restaurantId: restaurant.id,
      deliveryTo: 'Test Address',
    },
  });

  return { user, cart, restaurant, food, order };
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.$disconnect());

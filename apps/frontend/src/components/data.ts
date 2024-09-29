import { OrderDto, UserDto } from '@/api';

export const person: UserDto[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john1@doe.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '+3620111222',
    addresses: ['1010 Budapest, Kossuth Lajos utca 1.'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane2@smith.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '+3620111223',
    addresses: ['1051 Budapest, Váci utca 2.'],
  },
  {
    id: '3',
    name: 'David Johnson',
    email: 'david3@johnson.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    phone: '+3620111224',
    addresses: ['1061 Budapest, Andrássy út 3.'],
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily4@davis.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    phone: '+3620111225',
    addresses: ['1072 Budapest, Király utca 4.'],
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael5@brown.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    phone: '+3620111226',
    addresses: ['1085 Budapest, Rákóczi út 5.'],
  },
  {
    id: '6',
    name: 'Sophia Wilson',
    email: 'sophia6@wilson.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    phone: '+3620111227',
    addresses: ['1094 Budapest, Tompa utca 6.'],
  },
  {
    id: '7',
    name: 'James Taylor',
    email: 'james7@taylor.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    phone: '+3620111228',
    addresses: ['1106 Budapest, Jászberényi út 7.'],
  },
  {
    id: '8',
    name: 'Olivia Martinez',
    email: 'olivia8@martinez.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    phone: '+3620111229',
    addresses: ['1113 Budapest, Villányi út 8.'],
  },
  {
    id: '9',
    name: 'Benjamin Lee',
    email: 'benjamin9@lee.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    phone: '+3620111230',
    addresses: ['1126 Budapest, Márvány utca 9.'],
  },
  {
    id: '10',
    name: 'Amelia Gonzalez',
    email: 'amelia10@gonzalez.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
    phone: '+3620111231',
    addresses: ['1139 Budapest, Váci út 10.'],
  },
  {
    id: '11',
    name: 'William Harris',
    email: 'william11@harris.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    phone: '+3620111232',
    addresses: ['1146 Budapest, Dózsa György út 11.'],
  },
  {
    id: '12',
    name: 'Isabella Clark',
    email: 'isabella12@clark.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    phone: '+3620111233',
    addresses: ['1151 Budapest, Fő út 12.'],
  },
  {
    id: '13',
    name: 'Henry Robinson',
    email: 'henry13@robinson.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
    phone: '+3620111234',
    addresses: ['1163 Budapest, Veres Péter út 13.'],
  },
  {
    id: '14',
    name: 'Mia Rodriguez',
    email: 'mia14@rodriguez.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/14.jpg',
    phone: '+3620111235',
    addresses: ['1172 Budapest, Pesti út 14.'],
  },
  {
    id: '15',
    name: 'Alexander Lewis',
    email: 'alexander15@lewis.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
    phone: '+3620111236',
    addresses: ['1183 Budapest, Üllői út 15.'],
  },
  {
    id: '16',
    name: 'Charlotte Walker',
    email: 'charlotte16@walker.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/16.jpg',
    phone: '+3620111237',
    addresses: ['1191 Budapest, Ady Endre út 16.'],
  },
  {
    id: '17',
    name: 'Daniel Hall',
    email: 'daniel17@hall.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/17.jpg',
    phone: '+3620111238',
    addresses: ['1204 Budapest, Nagykőrösi út 17.'],
  },
  {
    id: '18',
    name: 'Grace Allen',
    email: 'grace18@allen.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/18.jpg',
    phone: '+3620111239',
    addresses: ['1211 Budapest, Kossuth Lajos utca 18.'],
  },
  {
    id: '19',
    name: 'Matthew Young',
    email: 'matthew19@young.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/men/19.jpg',
    phone: '+3620111240',
    addresses: ['1222 Budapest, Leányka utca 19.'],
  },
  {
    id: '20',
    name: 'Ava King',
    email: 'ava20@king.com',
    role: 'CUSTOMER',
    image: 'https://randomuser.me/api/portraits/women/20.jpg',
    phone: '+3620111241',
    addresses: ['1239 Budapest, Grassalkovich út 20.'],
  },
];

export const order: OrderDto[] = [
  {
    id: '1',
    userId: '1',
    restaurantId: '1',
    total: 1500,
    status: 'PENDING',
    createdAt: '2021-08-26T12:00:00.000Z',
    items: [
      {
        id: '1',
        foodId: '1',
        orderId: '1',
      },
    ],
  },
  {
    id: '2',
    userId: '2',
    restaurantId: '2',
    total: 2300,
    status: 'FINISHED',
    createdAt: '2021-08-26T12:15:00.000Z',
    items: [
      {
        id: '2',
        foodId: '2',
        orderId: '2',
      },
    ],
  },
  {
    id: '3',
    userId: '3',
    restaurantId: '3',
    total: 1800,
    status: 'CANCELLED',
    createdAt: '2021-08-26T12:30:00.000Z',
    items: [
      {
        id: '3',
        foodId: '3',
        orderId: '3',
      },
    ],
  },
  {
    id: '4',
    userId: '4',
    restaurantId: '4',
    total: 2500,
    status: 'ONGOING',
    createdAt: '2021-08-26T12:45:00.000Z',
    items: [
      {
        id: '4',
        foodId: '4',
        orderId: '4',
      },
    ],
  },
  {
    id: '5',
    userId: '5',
    restaurantId: '5',
    total: 1900,
    status: 'PENDING',
    createdAt: '2021-08-26T13:00:00.000Z',
    items: [
      {
        id: '5',
        foodId: '5',
        orderId: '5',
      },
    ],
  },
  {
    id: '6',
    userId: '6',
    restaurantId: '1',
    total: 3200,
    status: 'FINISHED',
    createdAt: '2021-08-26T13:15:00.000Z',
    items: [
      {
        id: '6',
        foodId: '6',
        orderId: '6',
      },
    ],
  },
  {
    id: '7',
    userId: '7',
    restaurantId: '2',
    total: 1100,
    status: 'ONGOING',
    createdAt: '2021-08-26T13:30:00.000Z',
    items: [
      {
        id: '7',
        foodId: '7',
        orderId: '7',
      },
    ],
  },
  {
    id: '8',
    userId: '8',
    restaurantId: '3',
    total: 2200,
    status: 'CANCELLED',
    createdAt: '2021-08-26T13:45:00.000Z',
    items: [
      {
        id: '8',
        foodId: '8',
        orderId: '8',
      },
    ],
  },
  {
    id: '9',
    userId: '9',
    restaurantId: '4',
    total: 2800,
    status: 'PENDING',
    createdAt: '2021-08-26T14:00:00.000Z',
    items: [
      {
        id: '9',
        foodId: '9',
        orderId: '9',
      },
    ],
  },
  {
    id: '10',
    userId: '10',
    restaurantId: '5',
    total: 1700,
    status: 'FINISHED',
    createdAt: '2021-08-26T14:15:00.000Z',
    items: [
      {
        id: '10',
        foodId: '10',
        orderId: '10',
      },
    ],
  },
  {
    id: '11',
    userId: '11',
    restaurantId: '1',
    total: 2400,
    status: 'CANCELLED',
    createdAt: '2021-08-26T14:30:00.000Z',
    items: [
      {
        id: '11',
        foodId: '11',
        orderId: '11',
      },
    ],
  },
  {
    id: '12',
    userId: '12',
    restaurantId: '2',
    total: 1500,
    status: 'ONGOING',
    createdAt: '2021-08-26T14:45:00.000Z',
    items: [
      {
        id: '12',
        foodId: '12',
        orderId: '12',
      },
    ],
  },
  {
    id: '13',
    userId: '13',
    restaurantId: '3',
    total: 3300,
    status: 'PENDING',
    createdAt: '2021-08-26T15:00:00.000Z',
    items: [
      {
        id: '13',
        foodId: '13',
        orderId: '13',
      },
    ],
  },
  {
    id: '14',
    userId: '14',
    restaurantId: '4',
    total: 2900,
    status: 'FINISHED',
    createdAt: '2021-08-26T15:15:00.000Z',
    items: [
      {
        id: '14',
        foodId: '14',
        orderId: '14',
      },
    ],
  },
  {
    id: '15',
    userId: '15',
    restaurantId: '5',
    total: 1700,
    status: 'ONGOING',
    createdAt: '2021-08-26T15:30:00.000Z',
    items: [
      {
        id: '15',
        foodId: '15',
        orderId: '15',
      },
    ],
  },
  {
    id: '16',
    userId: '16',
    restaurantId: '1',
    total: 1600,
    status: 'CANCELLED',
    createdAt: '2021-08-26T15:45:00.000Z',
    items: [
      {
        id: '16',
        foodId: '16',
        orderId: '16',
      },
    ],
  },
  {
    id: '17',
    userId: '17',
    restaurantId: '2',
    total: 2100,
    status: 'PENDING',
    createdAt: '2021-08-26T16:00:00.000Z',
    items: [
      {
        id: '17',
        foodId: '17',
        orderId: '17',
      },
    ],
  },
  {
    id: '18',
    userId: '18',
    restaurantId: '3',
    total: 1200,
    status: 'FINISHED',
    createdAt: '2021-08-26T16:15:00.000Z',
    items: [
      {
        id: '18',
        foodId: '18',
        orderId: '18',
      },
    ],
  },
  {
    id: '19',
    userId: '19',
    restaurantId: '4',
    total: 3100,
    status: 'ONGOING',
    createdAt: '2021-08-26T16:30:00.000Z',
    items: [
      {
        id: '19',
        foodId: '19',
        orderId: '19',
      },
    ],
  },
  {
    id: '20',
    userId: '20',
    restaurantId: '5',
    total: 1800,
    status: 'CANCELLED',
    createdAt: '2021-08-26T16:45:00.000Z',
    items: [
      {
        id: '20',
        foodId: '20',
        orderId: '20',
      },
    ],
  },
];

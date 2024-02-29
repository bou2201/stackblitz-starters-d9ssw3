export type ListUser = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type SearchUserParams = Omit<ListUser, 'users' | 'total'>;

export type User = {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: Address;
  bank: CardBlock;
  company: CompanyBlock;
};

export type Address = {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
};

export type CardBlock = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type CompanyBlock = {
  address: Address;
  department: string;
  name: string;
  title: string;
};

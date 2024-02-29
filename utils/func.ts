import { KeyValues } from '@/type/common.type';
import { Address, User } from '@/type/user.type';

export const getSearchParams = <T extends KeyValues>(params: T): string => {
  const url = new URLSearchParams();

  Object.entries(params).map(([key, value]) => {
    if (!value) {
      return;
    }
    url.append(key, value as string);
  });

  return '?' + url.toString();
};

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;

export const getAddress = (address: Address) =>
  `${address.address}, ${address.city}`;

export const getCompany = ({ company }: User) =>
  `${company.name} at ${company.address.address}, ${company.address.city}`;

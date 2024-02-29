import { ListUser, SearchUserParams, User } from '@/type/user.type';
import { getSearchParams } from '@/utils/func';

const API_URL = 'https://dummyjson.com/users';

export const getUsers = async (params: SearchUserParams) => {
  const queryParams = getSearchParams(params);
  const response = await fetch(API_URL + queryParams);

  if (!response.ok) {
    throw new Error();
  }
  return response.json() as Promise<ListUser>;
};

export const getUSer = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error();
  }
  return response.json() as Promise<User>;
};

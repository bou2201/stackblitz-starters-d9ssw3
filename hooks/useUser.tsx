import { getUsers } from '@/apis/user.api';
import { PagingUserRequest } from '@/models/user.model';
import { ListUser } from '@/type/user.type';
import { useEffect, useState } from 'react';

type UseUser = {
  listUser?: ListUser;
  isLoading: boolean;
  handlePagingUser: (params: PagingUserRequest) => Promise<void>;
};

const useUser = (): UseUser => {
  const [listUser, setListUser] = useState<ListUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handlePagingUser(new PagingUserRequest(0));
  }, []);

  const handlePagingUser = async (params: PagingUserRequest) => {
    if (!isLoading) setIsLoading(true);
    try {
      const data = await getUsers(params);
      setListUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    listUser,
    isLoading,
    handlePagingUser,
  };
};

export default useUser;

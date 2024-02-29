import { SearchUserParams } from '@/type/user.type';

export class PagingUserRequest implements SearchUserParams {
  limit = 10;
  skip = 0;

  constructor(skip: number) {
    this.skip = skip;
  }
}

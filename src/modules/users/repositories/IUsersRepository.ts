import { Users } from "../domain/users";
import { UsersWithDetails } from "../dtos/UsersWithDetails";

interface DataRequest {
  searchParam?: string;
  pageNumber?: string | number;
}

interface FindManyPropsResponse {
  users: UsersWithDetails[];
  count: number;
  hasMore: boolean;
}

export interface IUsersRepository {
  findManyAndCount(data: DataRequest): Promise<FindManyPropsResponse>;
  exists(email: string): Promise<boolean>;
  create(user: Users): Promise<void>
}

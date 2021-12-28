import { Either, right } from "@core/logic/Either";

interface UserProps {
  email?: string;
  password?: string;
  name?: string;
  profile?: string;
  queueIds?: number[];
}

type UpdateUserAccountRequest = {
  userId: string;
  userData: UserProps;
};

type UpdateUserAccountResponse = Either<Error, Object>;

export class UpdateUserAccount {
  async perform({
    userId,
    userData,
  }: UpdateUserAccountRequest): Promise<UpdateUserAccountResponse> {
    return right({});
  }
}

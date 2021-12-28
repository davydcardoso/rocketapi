import { Either, right } from "@core/logic/Either";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

type FindAllUsersRequest = {
  searchParam: string;
  pageNumber: string;
};

type FindAllUsersResponse = Either<Error, Object>;

export class FindAllUsers {
  constructor(private usersRepository: IUsersRepository) {}

  async perform({
    searchParam,
    pageNumber,
  }: FindAllUsersRequest): Promise<FindAllUsersResponse> {
    const resultUserConsult = await this.usersRepository.findManyAndCount({
      pageNumber,
      searchParam,
    });

    return right(resultUserConsult);
  }
}

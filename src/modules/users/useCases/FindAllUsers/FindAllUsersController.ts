import { Controller } from "@core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@core/infra/HttpResponse";
import { FindAllUsers } from "./FindAllUsers";

type FindAllUsersControllerRequest = {
  searchParam: string;
  pageNumber: string;
};

export class FindAllUsersController implements Controller {
  constructor(private findAllUsers: FindAllUsers) {}

  async handle(request: FindAllUsersControllerRequest): Promise<HttpResponse> {
    try {
      const { pageNumber, searchParam } = request;

      const result = await this.findAllUsers.perform({
        pageNumber,
        searchParam,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return ok(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}

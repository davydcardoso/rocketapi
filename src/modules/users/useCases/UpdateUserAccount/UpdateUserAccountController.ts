import { Controller } from "@core/infra/Controller";
import { clientError, fail, HttpResponse, ok } from "@core/infra/HttpResponse";
import { UpdateUserAccount } from "./UpdateUserAccount";

interface UserProps {
  email?: string;
  password?: string;
  name?: string;
  profile?: string;
  queueIds?: number[];
}

type UpdateUserAccountControllerRequest = {
  userId: string;
  userData: UserProps;
};

export class UpdateUserAccountController implements Controller {
  constructor(private updateUserAccount: UpdateUserAccount) {}

  async handle(
    request: UpdateUserAccountControllerRequest
  ): Promise<HttpResponse> {
    try {
      const { userId, userData } = request;

      const result = await this.updateUserAccount.perform({
        userId,
        userData,
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

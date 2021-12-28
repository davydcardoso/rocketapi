import { Controller } from "@core/infra/Controller";
import {
  clientError,
  created,
  fail,
  HttpResponse,
  forbidden,
} from "@core/infra/HttpResponse";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";
import { SettingsNotFoundError } from "./errors/SettingsNotFoundError";
import { UserCreationDisabledError } from "./errors/UserCreationDisabledError";
import { UserDoesNotHavePermissionError } from "./errors/UserDoesNotHavePermissionError";
import { RegisterUserAccount } from "./RegisterUserAccount";

type RegisterUserAccountControllerRequest = {
  requestUrl: string;
  email: string;
  password: string;
  name: string;
  profile: string;
  queueIds: [string] | null;
  userLevel: string;
};

export class RegisterUserAccountController implements Controller {
  constructor(
    private settingsRepository: ISettingsRepository,
    private registerUserAccount: RegisterUserAccount
  ) {}

  async handle(
    request: RegisterUserAccountControllerRequest
  ): Promise<HttpResponse> {
    try {
      const {
        name,
        email,
        password,
        profile,
        queueIds,
        requestUrl,
        userLevel,
      } = request;

      const settings = await this.settingsRepository.findByPk("userCreation");

      if (!settings) {
        return fail(new SettingsNotFoundError());
      }

      if (settings === "disabled") {
        return forbidden(new UserCreationDisabledError());
      } else if (requestUrl !== "/signup" && userLevel !== "admin") {
        return forbidden(new UserDoesNotHavePermissionError());
      }

      const result = await this.registerUserAccount.perform({
        name,
        email,
        password,
        profile,
        queueIds,
      });

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return clientError(error);
        }
      }

      return created(result.value);
    } catch (err) {
      return fail(err);
    }
  }
}

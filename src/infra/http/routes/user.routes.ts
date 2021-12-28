import { adaptMiddleware } from "@core/infra/adpters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adpters/ExpressRouteAdapter";
import { Router } from "express";
import { makeFindAllUsersControllerFactory } from "../factories/controller/FindAllUsersControllerFactory";
import { makeUpdateUserAccountControllerFactory } from "../factories/controller/UpdateUserAccountControllerFactory";
import { makeEnsureAuthenticatedMiddlewareFactory } from "../factories/middleware/EnsureAuthenticatedMiddlewareFactory";

const userRoutes = Router();

userRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddlewareFactory()));

userRoutes.post("/users", adaptRoute(makeFindAllUsersControllerFactory()));

userRoutes.put(
  "/users/:userId",
  adaptRoute(makeUpdateUserAccountControllerFactory())
);

export { userRoutes };

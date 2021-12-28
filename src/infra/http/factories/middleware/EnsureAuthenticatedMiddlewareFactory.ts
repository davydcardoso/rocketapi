import { Middleware } from "@core/infra/Middleware";
import { EnsureAuthenticatedMiddleware } from "@infra/http/middleware/EnsureAuthenticatedMiddleware";

export function makeEnsureAuthenticatedMiddlewareFactory(): Middleware {
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware();

  return ensureAuthenticatedMiddleware;
}

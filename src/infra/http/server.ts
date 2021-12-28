import gracefulShutdown from "http-graceful-shutdown";
import { logger } from "@util/logger";
import { app } from "./app";
import { startWebSocket } from "@infra/websocket/server";
import { makeStartAllWhatsappSessionsHandlerFactory } from "@infra/whatsapp/factories/StartAllWhatsappSessionsHandlerFactory";

const server = app.listen(process.env.PORT, () => {
  logger.info(`Server started on port: ${process.env.PORT}`);
});

startWebSocket(server);
// makeStartAllWhatsappSessionsHandlerFactory();
gracefulShutdown(server);

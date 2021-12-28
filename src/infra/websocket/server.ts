import { Server as SocketIO } from "socket.io";
import { Server } from "http";
import { SocketError } from "@core/domain/errors/SocketError";
import { logger } from "@util/logger";

let webSocket: SocketIO;

export const startWebSocket = (httpServer: Server): SocketIO => {
  webSocket = new SocketIO(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  webSocket.on("connection", (socket) => {
    logger.info("Client Connected");
    socket.on("joinChatBox", (ticketId: string) => {
      logger.info("A client joined a ticket channel");
      socket.join(ticketId);
    });

    socket.on("joinNotification", () => {
      logger.info("A client joined notification channel");
      socket.join("notification");
    });

    socket.on("joinTickets", (status: string) => {
      logger.info(`A client joined to ${status} tickets channel.`);
      socket.join(status);
    });

    socket.on("disconnect", () => {
      logger.info("Client disconnected");
    });
  });

  return webSocket;
};

export const getWebsocketServer = (): SocketIO => {
  if (!webSocket) {
    throw new SocketError("Socket IO not initialized");
  }
  return webSocket;
};

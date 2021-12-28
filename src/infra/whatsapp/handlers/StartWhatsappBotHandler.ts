import { WhatsappHandler } from "@core/infra/WhatsappHandler";
import { getWebsocketServer } from "@infra/websocket/server";
import { WhatsappSession } from "@modules/whatsapp/dtos/WhatsappSession";
import { logger } from "@util/logger";
import { Client } from "whatsapp-web.js";
import qrCode from "qrcode-terminal";
import { IWhatsappRepository } from "@modules/whatsapp/repositories/IWhatsappRepository";

interface Session extends Client {
  id?: number;
}

const sessions: Session[] = [];

export class StartWhatsappBotHandler implements WhatsappHandler {
  constructor(private whatsappRepository: IWhatsappRepository) {}

  async perform(whatsapp: WhatsappSession): Promise<Session> {
    return new Promise((resolve, reject) => {
      try {
        const websocket = getWebsocketServer();

        const sessionName = whatsapp.name;

        let sessionConfig;

        if (whatsapp && whatsapp.session) {
          sessionConfig = JSON.parse(whatsapp.session);
        }

        const whatsappBot: Session = new Client({
          session: sessionConfig,
          puppeteer: {
            executablePath: process.env.CHROME_BIN || undefined,
          },
        });

        whatsappBot.initialize();

        whatsappBot.on("qr", async (qrcode) => {
          logger.info("session:", sessionName);
          qrCode.generate(qrcode, { small: true });

          await this.whatsappRepository.updateQrCodeStatus(whatsapp.id, {
            qrcode: qrcode,
            status: "qrcode",
            retries: 0,
          });

          const sessionIndex = sessions.findIndex(
            (s) => s.id === whatsapp.whatsappId
          );

          if (sessionIndex === -1) {
            whatsappBot.id = whatsapp.whatsappId;

            sessions.push(whatsappBot);
          }

          websocket.emit("whatsappSession", {
            action: "update",
            session: whatsapp,
          });
        });

        whatsappBot.on("authenticated", async (session) => {
          logger.info(`Session: ${sessionName} AUTHENTICATED`);
          await this.whatsappRepository.updateSession(
            whatsapp.id,
            JSON.stringify(session)
          );
        });

        whatsappBot.on("auth_failure", async (message) => {
          console.error(
            `Session: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`
          );

          if (whatsapp.retries > 1) {
            await this.whatsappRepository.updateData(whatsapp.id, {
              retries: 0,
              sessions: "",
            });
          }

          const retry = whatsapp.retries;

          await this.whatsappRepository.updateData(whatsapp.id, {
            status: "DISCONNECTED",
            retries: retry + 1,
          });

          websocket.emit("whatsappSession", {
            action: "update",
            session: whatsapp,
          });

          reject(new Error("Error starting whatsapp session."));
        });

        whatsappBot.on("ready", async () => {
          logger.info(`Session: ${sessionName} READY`);

          await this.whatsappRepository.updateData(whatsapp.id, {
            status: "CONNECTED",
            qrcode: "",
            retries: 0,
          });

          websocket.emit("whatsappSession", {
            action: "update",
            session: whatsapp,
          });

          const sessionIndex = sessions.findIndex(
            (s) => s.id === whatsapp.whatsappId
          );

          if (sessionIndex === -1) {
            whatsappBot.id = whatsapp.whatsappId;

            sessions.push(whatsappBot);
          }

          whatsappBot.sendPresenceAvailable();

          
          
          resolve(whatsappBot);
        });
      } catch (err) {
        logger.error(err);
      }
    });
  }
}

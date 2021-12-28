import { prisma } from "@infra/prisma/connection";
import { Settings } from "@prisma/client";
import { ISettingsRepository } from "../ISettingsRepository";

export class PrismaSettingsRepository implements ISettingsRepository {
  async findByPk(key: string): Promise<string> {
    const { value } = await prisma.settings.findFirst({
      select: {
        value: true,
      },
      where: { key },
    });

    if (!value) {
      return null;
    }

    return value;
  }
}

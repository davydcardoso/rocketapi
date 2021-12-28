export interface ISettingsRepository {
  findByPk(key: string): Promise<string>
}
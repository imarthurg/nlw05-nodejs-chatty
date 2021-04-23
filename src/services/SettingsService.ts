import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: SettingsRepository;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create(data: ISettingsCreate) {
    const settings = this.settingsRepository.create({
      chat: data.chat,
      username: data.username,
    });

    const userAlreadyExists = await this.settingsRepository.findOne({
      username: data.username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    await this.settingsRepository.save(settings);

    return settings;
  }
}

export { SettingsService };

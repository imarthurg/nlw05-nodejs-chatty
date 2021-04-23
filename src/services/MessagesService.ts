import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../models/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessageCreate {
  admin_id?: string;
  text: string;
  user_id: string;
}

class MessageService {
  private messageRepository: Repository<Message>;

  constructor() {
    this.messageRepository = getCustomRepository(MessagesRepository);
  }

  async create(data: IMessageCreate) {
    const message = await this.messageRepository.create({
      admin_id: data.admin_id,
      text: data.text,
      user_id: data.user_id,
    });

    await this.messageRepository.save(message);

    return message;
  }

  async listByUser(user_id: string) {
    const messages = await this.messageRepository.find({
      where: { user_id },
      relations: ['user'],
    });

    return messages;
  }
}

export { MessageService };

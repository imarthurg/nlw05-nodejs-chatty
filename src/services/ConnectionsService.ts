import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../models/Connection';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const conn = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(conn);

    return conn;
  }

  async findByUserId(user_id: string) {
    return this.connectionsRepository.findOne({ user_id });
  }

  async findAllWithouAdmin() {
    return this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });
  }
}

export { ConnectionsService };

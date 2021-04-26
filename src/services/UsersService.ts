import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserCreateDTO {
  email: string;
}

class UsersService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async create(data: IUserCreateDTO) {
    const userExists = await this.findByEmail(data.email);

    if (userExists) {
      return userExists;
    }

    const user = this.userRepository.create({ email: data.email });

    await this.userRepository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const userExists = await this.userRepository.findOne({ email });

    if (userExists) {
      return userExists;
    }
  }
}

export { UsersService };

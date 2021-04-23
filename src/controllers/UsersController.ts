import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UsersController {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    const userService = new UsersService();

    try {
      const user = await userService.create({ email });

      return res.json(user);
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
}

export { UsersController };

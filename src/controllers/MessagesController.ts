import { Request, Response } from 'express';
import { MessageService } from '../services/MessagesService';

class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, user_id, text } = req.body;

    const messagesService = new MessageService();

    const message = await messagesService.create({ admin_id, user_id, text });

    res.json(message);
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params;

    const messagesService = new MessageService();

    const messages = await messagesService.listByUser(id);

    return res.json(messages);
  }
}

export { MessagesController };

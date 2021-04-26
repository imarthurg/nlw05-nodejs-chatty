import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  create = async (req: Request, res: Response) => {
    const { chat, username } = req.body;
    const settingsService = new SettingsService();
    try {

      const settings = await settingsService.create({ chat, username });

      return res.json(settings);
    } catch (e) {
      console.log(e.message);
      
      return res.status(412).json({ message: e.message });
    }
  }

  findByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    const settingsService = new SettingsService();
    try {

      const settings = await settingsService.findByUserName(username);

      return res.json(settings);
    } catch (e) {
      console.log(e.message);
      
      return res.status(412).json({ message: e.message });
    }
  }

  update = async (req: Request, res: Response) => {
    const { username } = req.params;
    const { chat } = req.body;
    const settingsService = new SettingsService();
    try {

      const settings = await settingsService.update(username, chat);

      return res.json(settings);
    } catch (e) {
      console.log(e.message);
      
      return res.status(412).json({ message: e.message });
    }
  }
}

export { SettingsController };

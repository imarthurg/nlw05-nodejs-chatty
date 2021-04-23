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
}

export { SettingsController };

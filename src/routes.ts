import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const router = Router();

console.log('[routes] Setting routes...')

const settingsController = new SettingsController();

router.post('/settings', settingsController.create);
router.get('/settings/:username', settingsController.findByUsername);
router.put('/settings/:username', settingsController.update);

const usersController = new UsersController();

router.post('/users', usersController.create);

const messagesController = new MessagesController();

router.post('/messages', messagesController.create);
router.get('/messages/:id', messagesController.showByUser);

console.log('[routes] Routes settled');

export { router };

import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessageService } from '../services/MessagesService';

io.on('connect', async (socket) => {
  const connetionsService = new ConnectionsService();
  const messagesService = new MessageService();

  const allConnectionsWithoutAdmin = await connetionsService.findAllWithouAdmin();

  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async ({ user_id }, cb) => {
    const messages = await messagesService.listByUser(user_id);

    cb(messages);
  });

  socket.on('admin_send_message', async (params) => {
    const { text, user_id } = params;
    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const { socket_id } = await connetionsService.findByUserId(user_id);

    io.to(socket_id).emit('admin_send_to_client', { text, socket_id });
  });
});

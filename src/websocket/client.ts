import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessageService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessageService();

  socket.on('client_first_access', async (params: IParams) => {
    const { text, email } = params;

    let user = await usersService.findByEmail(email);

    if (!user) {
      user = await usersService.create({ email });

      await connectionsService.create({
        socket_id: socket.id,
        user_id: user.id,
      });
    } else {
      const conn = await connectionsService.findByUserId(user.id);

      if (!conn) {
        await connectionsService.create({
          socket_id: socket.id,
          user_id: user.id,
        });
      } else {
        conn.socket_id = socket.id;
        await connectionsService.create(conn);
      }
    }

    await messagesService.create({
      text,
      user_id: user.id,
    });

    const allMessages = await messagesService.listByUser(user.id);

    socket.emit('client_list_all_messages', allMessages);
  });
});

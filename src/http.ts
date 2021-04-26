import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server, Socket } from 'socket.io';
import './database';
import { router } from './routes';

const app = express();

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
  console.log(socket.id);
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'hmtl');

app.get('/pages/client', (req, res) => {
  return res.render('html/client.html');
});
app.get('/pages/admin', (req, res) => {
  return res.render('html/admin.html');
});

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export { http, io };

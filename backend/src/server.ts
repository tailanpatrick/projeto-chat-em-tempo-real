import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import connectDB from './db.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

connectDB()
	.then(async () => {
		console.log('MongoDB Conectado! Iniciando servidores...');

		const { default: Message } = await import('./models/Message.js');
		const { default: messageRoutes } = await import('./routes/messages.js');

		const app = express();

		app.use(
			cors({
				origin: ['https://frontend-chat-em-tempo-real.vercel.app', 'http://localhost:3000'],
			})
		);
		app.use(express.json());
		app.use('/api', messageRoutes);

		const server = createServer(app);

		// WebSocket at same server
		const wss = new WebSocketServer({ server });

		wss.on('connection', (ws) => {
			console.log('Cliente WebSocket conectado');

			ws.on('message', async (data) => {
				try {
					const parsedMessage = JSON.parse(data.toString());

					const savedMessage = await Message.create({
						text: parsedMessage.text,
						user: parsedMessage.user,
						color: parsedMessage.color,
					});

					console.log(
						'Mensagem salva e retransmitida:',
						savedMessage
					);

					wss.clients.forEach((client) => {
						if (client.readyState === ws.OPEN) {
							client.send(JSON.stringify(savedMessage));
						}
					});
				} catch (err: any) {
					console.error('Erro ao processar a mensagem:', err.message);
				}
			});

			ws.on('close', () => console.log('Cliente desconectado'));
			ws.on('error', (err) =>
				console.error('Erro no WebSocket:', err.message)
			);
		});

		// Start HTTP + WebSocket on the same port
		server.listen(PORT, () => {
			console.log(
				`Servidor Express + WebSocket rodando na porta ${PORT}`
			);
		});
	})
	.catch((error) => {
		console.error('Erro ao conectar no MongoDB:', error.message);
	});

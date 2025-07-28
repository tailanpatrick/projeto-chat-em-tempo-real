import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './db.js';

dotenv.config();

const wsPort = Number(process.env.PORT) || 3001;
const expressAppPort = 3002;

connectDB()
	.then(async () => {
		console.log('MongoDB Conectado! Iniciando servidores...');

		const { default: Message } = await import('./models/Message.js');
		const { default: messageRoutes } = await import('./routes/messages.js');

		const wss = new WebSocketServer({ port: wsPort }, () => {
			console.log(`Servidor WebSocket rodando na porta ${wsPort}`);
		});

		wss.on('connection', (ws) => {
			console.log('Cliente WebSocket conectado');

			ws.on('message', async (data: any) => {
				let parsedMessage: any;
				try {
					parsedMessage = JSON.parse(data.toString());

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
					console.error(
						'Erro ao processar a mensagem do WebSocket:',
						err.message
					);
				}
			});

			ws.on('close', () => {
				console.log('Cliente WebSocket desconectado');
			});

			ws.on('error', (err: any) => {
				console.error('Erro no WebSocket do cliente:', err.message);
			});
		});

		const app = express();

		app.use(express.json());
		app.use('/api', messageRoutes);

		app.listen(expressAppPort, () => {
			console.log(
				`Servidor Express (API REST) rodando na porta ${expressAppPort}`
			);
		});
	})
	.catch((error: any) => {
		console.error(
			'ERRO CRÍTICO: Falha ao iniciar a aplicação devido a erro de conexão com o banco de dados.',
			error.message
		);
	});

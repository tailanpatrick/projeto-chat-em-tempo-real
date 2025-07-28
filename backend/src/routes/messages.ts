import { Router } from 'express';
import Message from '../models/Message.js';

const routerMessages = Router();

routerMessages.get('/messages', async (req, res) => {
	try {
		const messages = await Message.find();
		console.log(messages);
		res.status(200).json(messages);
	} catch (error) {
		console.error('Erro ao buscar mensagens:', error);
		res.status(500).json({ error: 'Erro interno ao buscar mensagens' });
	}
});

export default routerMessages;

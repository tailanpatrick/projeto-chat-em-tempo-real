// server.ts
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT) || 3001;
const wss = new WebSocketServer({ port }, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (data) => {
        let messageJson;
        try {
            messageJson = JSON.parse(data.toString());
            console.log('Mensagem recebida:', messageJson);
        }
        catch (err) {
            console.error('Erro ao converter JSON:', err);
            return;
        }
        // Reenvia para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify(messageJson));
            }
        });
    });
});

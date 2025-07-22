import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT) || 3001;
const wss = new WebSocketServer({ port, host: '0.0.0.0' }, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(data.toLocaleString());
        wss.clients.forEach((client) => {
            client.send(data.toString());
        });
        ws.send(data);
    });
    console.log('client connected');
});
wss.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${port} já está em uso.`);
        process.exit(1);
    }
    else {
        console.error(err);
    }
});

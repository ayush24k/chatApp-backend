import express from 'express';
import dotenv from 'dotenv';
import WebSocketService from './services/webSocketService';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send("Hello from the server")
})

async function serverInit() {
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    // http server init
    const server = app.listen(PORT, () => {
        console.log(`Server startd at port: ${PORT} \nlink: http://localhost:${PORT}`);
    })

    // websocket server init
    const wss = new WebSocketService(server);

    wss.connect.on("connection", (ws) => {
        ws.on('error', (err) => {
            console.log(err);
        })

        console.log('connection intilaised')
    })
}

serverInit();
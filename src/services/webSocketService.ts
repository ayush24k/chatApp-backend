import { WebSocket, WebSocketServer } from 'ws'
import { pub, sub } from './redisClient';
import prismaClient from './prismaClient';

class WebSocketService {
    private wss: WebSocketServer;
    private isRedisListnerSetup = false

    constructor(server: any) {
        console.log("initialised websocket server...");
        this.wss = new WebSocketServer({ server });
        this.setupRedisSubscription();
    }

    private async setupRedisSubscription() {
        if (this.isRedisListnerSetup) return;
        await sub.subscribe("MESSAGES");

        sub.on('message', async (channel, message) => {
            console.log(`new message from redis`, message);
            if (channel === "MESSAGES") {
                this.wss.clients.forEach(async (client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(message);

                        // sending data to database
                        await prismaClient.message.create({
                            data: {
                                text: message
                            }
                        })
                    }
                })
            }
        })

        this.isRedisListnerSetup = true;
        console.log("Redis listner and subscition setup complete!");
    }

    public initListener() {
        console.log("Sockect Listener init...")
        this.wss.on('connection', (ws) => {
            console.log("connection initilasied!");
            ws.on('error', err => console.log(err));
            ws.on('message', async (message) => {
                const messageStr = message.toString('utf-8');
                console.log("New Message received: ", messageStr)
                // publish this data to redis
                await pub.publish("MESSAGES", messageStr)

            })
        })
    }

    get connect() {
        return this.wss;
    }
}

export default WebSocketService;
import { error } from 'console';
import {WebSocketServer} from 'ws'

class WebSocketService {
    private wss: WebSocketServer;
    
    constructor(server: any) {
        console.log("initialised websocket server...");
        this.wss = new WebSocketServer({server});
    }

    public initListener() {
        console.log("Sockect Listener init...")
        this.wss.on('connection', (ws) => {
            ws.on('error', err => console.log(err));

            console.log("connection initilasied!"); 
        })
    }

    get connect() {
        return this.wss;
    }
}

export default WebSocketService;
import {WebSocketServer} from 'ws'

class WebSocketService {
    private wss: WebSocketServer;
    
    constructor(server: any) {
        console.log("init websocket server");
        this.wss = new WebSocketServer({server});
    }

    get connect() {
        return this.wss;
    }
}

export default WebSocketService;
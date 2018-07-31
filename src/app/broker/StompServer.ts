import * as Stomp from "stompjs";

export class StompServer {

    private address: string;
    private port: number;
    private user: string;
    private pass: string;
    private clientId: string;

    constructor(addr: string, port: number, user?: string, pass?: string, clientId?: string){
        this.address = addr;
        this.port = port;
        this.user = user;
        this.pass = pass;
        this.clientId = clientId;
    }

    public static createLocalhostConsumer(): StompServer{
        return new StompServer( "127.0.0.1", 61613, "admin", "admin","nodeStockConsumer");
    }

    public static createLocalhostProducer(): StompServer{
        return new StompServer( "127.0.0.1", 61613, "admin", "admin","nodeStockproducer");
    }

    public getAddress(): string {
        return this.address;
    }
    public getPort(): number {
        return this.port;
    }
    public getUser(): string {
        return this.user;
    }
    public getPass(): string {
        return this.pass;
    }
    public getClientId(): string {
        return this.clientId;
    }

    public createClient(): Stomp.Client {
        return Stomp.overTCP(this.getAddress(), this.getPort());
    }
}    

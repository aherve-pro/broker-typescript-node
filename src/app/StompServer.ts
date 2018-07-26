import * as Stomp from "stomp-client";



export class StompServer {

    private address: string;
    private port: number;
    private user: string;
    private pass: string;

    constructor(addr: string, port: number, user?: string, pass?: string){
        this.address = addr;
        this.port = port;
        this.user = user;
        this.pass = pass;
    }

    public static createLocalhost(): StompServer{
        return new StompServer("127.0.0.1", 61613, "admin", "admin");
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

    public bind(){
        return new Stomp.StompClient(this.getAddress(), this.getPort(), this.getUser(), this.getPass());
    }
}    

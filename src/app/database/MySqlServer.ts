export class MySqlServer {

    private address: string;
    private database: string;
    private port: number;
    private user: string;
    private password: string;

    constructor(addr: string, port: number, database: string, user?: string, password?: string){
        this.address = addr;
        this.database = database;
        this.port = port;
        this.user = user;
        this.password = password;
    }

    public static createLocalhost(): MySqlServer{
        return new MySqlServer("localhost", 3306, "poc_bg", "pocbg", "pocbg");
    }

    public getAddress(): string {
        return this.address;
    }
    public getDatabase(): string {
        return this.database;
    }
    public getPort(): number {
        return this.port;
    }
    public getUser(): string {
        return this.user;
    }
    public getPassword(): string {
        return this.password;
    }
}    

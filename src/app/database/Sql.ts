import * as MySql from "mysql";
import { MySqlServer } from "./MySqlServer";

export class Sql {

    private server: MySqlServer = MySqlServer.createLocalhost();
    private client: any = undefined;


    private connect(){
        if(!this.client) {
            this.client = MySql.createConnection("mysql://"+this.server.getUser()+":"+this.server.getPassword()+"@"+this.server.getAddress()+":"+this.server.getPort()+"/"+this.server.getDatabase());
            this.client.connect();
        }        
    }

    private close() {
        if(this.client) {
            this.client.end();
        }
    }

    public insertJsonData(jsonData: string) {
        this.connect();
        console.log(` data : ${jsonData}`);
        this.client.query(`
            INSERT INTO Stock (jsonDetails) VALUES ('${jsonData}')
                ON DUPLICATE KEY UPDATE jsonDetails='${jsonData}'
            `, (error, results, fields)=> {
                if (error) throw error;            
            }
        );
    }
}
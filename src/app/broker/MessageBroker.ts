import { Message } from "./Message";
import { Topic } from "./Topic";
import { StompServer } from "./StompServer";
import { Client } from "stompjs";


export interface ConsumerDelegate{
    onNewMessage(message: Message);
}

export interface HeaderJson{
    login: String;
    passcode: String;
    'client-id': String;
}

export class MessageBroker {

    // Client will take 
    private client: Client = undefined;

    private server: StompServer;
    private headers: HeaderJson;
    private topic: Topic;


    constructor(server: StompServer, topic: Topic, ){
        this.server = server;
        this.topic = topic;
        this.headers = 
            {
                login: server.getUser(),
                passcode: server.getPass(),
                'client-id': server.getClientId()
            }
    }

    private init(){
        if (!this.client){
            this.client = this.server.createClient();
        }
    }

    private connect( callback: ()=>void ){
        this.init();
        this.client.connect(this.headers, () => {
            console.log("Connected to localhost ActiveMQ");
            callback();
        });
    }

    public produce(data){
        this.connect( () => { 
            this.client.send(this.topic.getName(), {}, JSON.stringify(data));
            this.client.disconnect(() => {
                console.log("Disconnected");
            });
        });
    }

    public consume(delegate: ConsumerDelegate){
        this.connect( () => { 
            this.client.subscribe(
                this.topic.getName(), 
                (message) => {
                    delegate.onNewMessage(new Message(message.body, message.headers));
                }, 
                { "activemq.subscriptionName": this.server.getClientId()} 
            );
        } );
        
    }
}




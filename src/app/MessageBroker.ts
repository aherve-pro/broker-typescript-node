import { Message } from "./Message";
import { Topic } from "./Topic";
import { StompServer } from "./StompServer";


export interface ConsumerDelegate{
    onNewMessage(message: Message);
}

export class MessageBroker {

    private sessionId: string;
    private client: any = undefined;

    private server: StompServer;
    private topic: Topic;

    constructor(server: StompServer, topic: Topic, ){
        this.server = server;
        this.topic = topic;
    }

    private init(){
        if (!this.client){
            this.client = this.server.bind();
        }
    }

    private connect( callback: ()=>void ){
        this.init();
        this.client.connect((sessionId) => {
            this.sessionId = sessionId;
            console.log("Connected", sessionId);
            callback();
        });
    }

    public produce(data){
        this.connect( () => { 
            this.client.publish(this.topic.getName(), JSON.stringify(data));
            this.client.disconnect(() => {
                console.log("Disconnected");
            });
        });
    }

    public consume(delegate: ConsumerDelegate){
        this.connect( () => { 
            this.client.subscribe(this.topic.getName(), {}, (body, headers) => {
                delegate.onNewMessage(new Message(body, headers));
            });
        } );
        
    }
}




import { MessageBroker } from "./src/app/MessageBroker";
import { Message } from "./src/app/Message";
import { StompServer } from "./src/app/StompServer";
import { Topic } from "./src/app/Topic";

const consumer = new MessageBroker(StompServer.createLocalhost(), Topic.createStockChange());
consumer.consume({
    onNewMessage(message: Message){
        console.log(message);
    }
});

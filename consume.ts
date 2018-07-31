import { MessageBroker } from "./src/app/broker/MessageBroker";
import { Message } from "./src/app/broker/Message";
import { StompServer } from "./src/app/broker/StompServer";
import { Topic } from "./src/app/broker/Topic";
import { Sql } from "./src/app/database/Sql";

const consumer = new MessageBroker(StompServer.createLocalhostConsumer(), Topic.createStockChange());
const sql = new Sql();

consumer.consume({
    onNewMessage(message: Message){
        sql.insertJsonData(message['data']);
    }
});

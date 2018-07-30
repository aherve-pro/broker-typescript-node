import { MessageBroker } from "./src/app/MessageBroker";
import { Message } from "./src/app/Message";
import { StompServer } from "./src/app/StompServer";
import { Topic } from "./src/app/Topic";
import { MySqlServer } from "./src/app/database/MySqlServer";
import { Sql } from "./src/app/database/Sql";

const consume = new MessageBroker(StompServer.createLocalhost(), Topic.createStockChange());
const sql = new Sql();
consume.consume({
    onNewMessage(message: Message){
        // message.database
        var test = sql.insertJsonData(message['data']);
        console.log(message['data']);
    }
});

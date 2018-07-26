import { MessageBroker } from "./src/app/MessageBroker";
import { StompServer } from "./src/app/StompServer";
import { Topic } from "./src/app/Topic";

const producer = new MessageBroker(StompServer.createLocalhost(), Topic.createStockChange() );
producer.produce( {sku:"v125", stock:3, threshold: 1} );
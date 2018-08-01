# broker-typescript-node

Typescript application with an ActiveMQ and MySQL integration
Data are extract from an XML message and store in a MySQL JSON field  
Auto extraction of json data from this JSON MySQL field to create an auto generated field

## Prerequisite : 
Active MQ 5 (Default configuration)
MySQL 5.7 (Default configuration)

## Install dependances globally
```
npm install -g typescript ts-node
```

```
git clone ...
npm install
```

## Create MySQL table 
```
Create a database poc_bg with user/pass poc_bg/poc_bg

CREATE TABLE stock (
  jsonDetails JSON,
  sku VARCHAR(255) GENERATED ALWAYS AS (jsonDetails->>"$.sku") NOT NULL, 
  wid VARCHAR(255) GENERATED ALWAYS AS (jsonDetails->>"$.wid") NOT NULL, 
  qty INT GENERATED ALWAYS AS (jsonDetails->"$.qty") NOT NULL
)

CREATE UNIQUE INDEX sku_wid_idx ON stock(sku,wid); 
```

## Start activemq

Start activemq locally. It has to serve on `127.0.0.1` on port `61613`.


## Start message consumption

```
ts-node consume
```
This command consume all message on __topic__ stock/Change and show Message on console.

Important : Consumer is able to process previous message only if the consumer has been connected at least once to ActiveMQ

## Post a message with ActiveMQ Rest API : 
```
curl -d '
    <abc:request>
        <abc:actions>
            <abc:item sku="12345" wid="ABC" qty="3"/>
        </abc:actions>
    </abc:request>
'  -H "Content-Type: application/xml" -u admin:admin -X POST http://127.0.0.1:8161/api/message?destination=topic://stock/change
```

## Access to ActiveMQ console for Topic
```
http://localhost:8161/admin/topics.jsp
```


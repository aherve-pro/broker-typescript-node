# broker-typescript-node


## Install dependances globally
```
npm install -g typescript ts-node
```

```
git clone ...
npm install
```

## Start activemq

Start activemq locally. It has to serve on `127.0.0.1` on port `61613`.

## Start production

```
ts-node produce
```
This command produce a message on __topic__ stock/change

## Start consumation

```
ts-node consume
```
This command consume all message on __topic__ stock/Change and show Message on console.


# To understand
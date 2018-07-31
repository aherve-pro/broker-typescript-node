export class Topic {

    private name: string;


    public static createStockChange(){
        return new Topic("stock/change");
    }


    constructor(name: string){
        this.name = name;
    }

    public getName(){
        return `/topic/${this.name}`;
    }
}

export class Message {

    private data: string;
    private attributes: any;


    constructor(body: string, headers: any){
        this.data = JSON.parse(body);
        this.attributes = headers;
    }
}
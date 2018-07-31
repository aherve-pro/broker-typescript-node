import * as xmljs from "xml-js";

export class Message {

    private data: string;
    private attributes: any;

    constructor(body: string, headers: any){
        let rawData = xmljs.xml2json(body,{compact: true, trim: true, nativeType: true});
        let extractData = JSON.parse(rawData)['abc:request']['abc:actions']['abc:item']['_attributes'];
        this.data = JSON.stringify(extractData);
        this.attributes = headers;
    }
}
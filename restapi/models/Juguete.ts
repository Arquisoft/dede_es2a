import {ObjectId} from "mongodb";

export default class Juguete {
    constructor(public name: string, public description: string, public id?: ObjectId){}
}
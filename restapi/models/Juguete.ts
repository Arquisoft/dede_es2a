import {ObjectId} from "mongodb";

export default class Juguete {
    constructor(public name: string, public description: string, public precio: number, public imagen: string, public categoria: string ,public id?: ObjectId){}
}
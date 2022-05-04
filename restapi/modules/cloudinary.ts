const cloudinary = require('cloudinary').v2;
require('dotenv').config()

var name: string = process.env.CLOUDINARY_NAME || 'name'
var api_key:string = process.env.CLOUDINARY_API_KEY || 'key'
var secret:string = process.env.CLOUDINARY_API_SECRET || 'secret'

export function config(){
    cloudinary.config({
        cloud_name : name,
        api_key : api_key,
        api_secret: secret
    });
}

export function configTest(){
    cloudinary.config({
        cloud_name : 'university-of-oviedo',
        api_key : '217383423965696',
        api_secret: 'EbIMzERq_gU_-51ljapKSbYn6ms'
    });
}



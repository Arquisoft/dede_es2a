const cloudinary = require('cloudinary').v2;
require('dotenv').config()


export function config(){
    cloudinary.config({
        cloud_name : 'dypp8pt31',
        api_key : '321597164512969',
        api_secret: 'sM2uhnqaS53Sq9_HsPDLK63FS7I'
    });
}

export function configTest(){
    cloudinary.config({
        cloud_name : 'university-of-oviedo',
        api_key : '217383423965696',
        api_secret: 'EbIMzERq_gU_-51ljapKSbYn6ms'
    });
}

/*
export function config(){
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME!,
        api_key : process.env.CLODINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
    })
    console.log(process.env.CLOUDINARY_NAME);
}*/


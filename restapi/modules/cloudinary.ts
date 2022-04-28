const cloudinary = require('cloudinary').v2;
require('dotenv').config()

/*
export function config(){
    cloudinary.config({
        cloud_name : 'dypp8pt31',
        api_key : '321597164512969',
        api_secret: 'sM2uhnqaS53Sq9_HsPDLK63FS7I'
    });
}
*/

export function config(){
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME!,
        api_key : process.env.CLODINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
    })
    console.log(process.env.CLOUDINARY_NAME);
}
const cloudinary = require('cloudinary').v2;

export function config(){
    cloudinary.config({
        cloud_name : 'dypp8pt31',
        api_key : '321597164512969',
        api_secret: 'sM2uhnqaS53Sq9_HsPDLK63FS7I'
    });
}
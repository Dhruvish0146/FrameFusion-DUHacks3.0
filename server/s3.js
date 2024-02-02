const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
require('dotenv').config();


const s3Client = new S3Client({
    region:process.env.AWS_REGION,
    Credentials:fromIni({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    }),

});

const putObject = async function (filename, ContentType)  {
    const command = new PutObjectCommand({
        Bucket: "framefusion-art",
        Key: `/uploads/user-uploads/${filename}`,
        ContentType: ContentType,
        
    });
    const url=await getSignedUrl(s3Client,command);
    // console.log('####',url)
    return url;

    
};

module.exports = {
    initialize: async () => {
        const filename = `image-${Date.now()}.jpeg`;
        const contentType = "image/png";
        console.log('URL for uploading', await putObject(filename, contentType));
    },
    putObject: putObject,
};
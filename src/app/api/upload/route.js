import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import uniqid from "uniqid"

export async function POST(req){
    const formdata=await req.formData()
     if(formdata.has('file')){
        const file=formdata.get('file')
        
        const s3Client=new S3Client({
            region:'ap-southeast-2',
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
            },
        })

        const randomId=uniqid()
        const ext=file.name.split('.').pop()
        const newFilename=randomId+'.'+ext
        const bucketname=process.env.BUCKETLIST
         
        const chunks=[]
         for await(const chunk of file.stream()){
            chunks.push(chunk)
        }

        await s3Client.send(new PutObjectCommand({
            Bucket:bucketname,
            Key:newFilename,
            ACL:'public-read',
            Body:Buffer.concat(chunks),
            ContentType:file.type,
        }))
        const link=`https://${bucketname}.s3.amazonaws.com/${newFilename}`
        return Response.json(link);
     }
}
import express from'express'
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const app = express();
app.use(express.json());
app.post('/hooks/catch/:userId/:zapId', async(req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body  = req.body
    console.log("message recieved");
    await client.$transaction(async (tx) =>{
        console.log("message recieved 2");
        const run = await tx.zaprun.create({
            data:{
                zapId:zapId,
                metadata:body
            }
            
        })
        console.log("message 3")
        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
        console.log("message 4");
    })
    res.json({
        message:"webhook recieved"
    })
   
})


app.listen(3001, (()=>{
    console.log("port started in 3001")
}));
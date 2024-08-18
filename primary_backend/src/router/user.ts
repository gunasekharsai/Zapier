import { Router } from "express";
import { authmiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaclient } from "../db";
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "../config";
const router = Router();

router.post("/signup", async(req,res) =>{
    const body= req.body;
    const parseddata = SignupSchema.safeParse(body);
    if(!parseddata.success){
        return res.status(411).json({
            message:"invalid inputs"
        })
    }

    const userexists = await prismaclient.user.findFirst({
        where:{
            email:parseddata.data?.username
        }
    })

    if(userexists){
        return res.status(403).json({
            message:"user alrdey exists"
        })
    }

    await prismaclient.user.create({
        data:{
            email:parseddata.data.username,
            //todo: dont do passwords in plain text
            password:parseddata.data.password,
            name:parseddata.data.name
        }
    })

    return res.json({
        messsage:"please verify your account by checking email"
    })
})
 

router.post("/signin", async (req,res) =>{  

   const body = req.body;
   const parseddata = SigninSchema.safeParse(body);

   if(parseddata.success == false){
       return res.status(411).json({
        message:"invalid inputs",
       })
   }

   const user = await prismaclient.user.findFirst({
    where:{
        email:parseddata.data.username,
        password:parseddata.data.password
    }
   })

   if(!user){
    return res.status(403).json({
        message:"user not exist"
    })
   }

   //sign the jwt
   const token = jwt.sign({

        id: user.id ,
   }, JWT_SECRET)

   res.json({
    token:token
   })


})
router.get("/", authmiddleware,  async (req,res) =>{

    //@ts-ignore
   const id = req.id,
   const user = await prismaclient.user.findFirst({
    where:{
        id:id
    },
    select:{
        name:true,
        email:true
    }
   })

   return res.json({
    user,
   })


})

export const userRouter = router
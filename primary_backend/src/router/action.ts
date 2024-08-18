import { Router } from "express";
import { prismaclient } from "../db";

const router = Router()

router.get("/available", async (req, res) =>{
    const availableactions = await prismaclient.availableAction.findMany({});
    res.json({
        availableactions
    })
})

export const actionrouter = router
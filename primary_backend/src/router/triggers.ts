import { Router } from "express";
import { prismaclient } from "../db";

const router = Router()

router.get("/available", async (req, res) =>{
    const availabletriggers = await prismaclient.availableTriggers.findMany({});
    res.json({
        availabletriggers
    })
})

export const triggerrouter = router;


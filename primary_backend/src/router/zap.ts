import { Router } from "express";
import { authmiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaclient } from "../db";

const router = Router();

router.post("/", authmiddleware, async (req, res) => {
  const body = req.body;
  //@ts-ignore
  const id = req.id;

  
  const parseddata = ZapCreateSchema.safeParse(body);

  if (!parseddata.success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }

const zapid =  await prismaclient.$transaction(async tx => {
    const zap = await prismaclient.zap.create({
      data: {
        userId: id,
        triggerId: "",
        actions: {
          create: parseddata.data.actions.map((x, index) => ({
            actionId: x.availableactionId,
            sortingorder: index,
          })),
        },
      },
    });
    const trigger = await tx.trigger.create({
      data: {
        triggerid: parseddata.data.availabletriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      }
    })
    return zap.id
  })
 

  return res.json({
    zapid
  })
});

router.get("/", authmiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const zaps = await prismaclient.zap.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

router.get("/:zapId", authmiddleware, async(req, res) => {
  //@ts-ignore
  const id = req.id;
  const zapid = req.params.zapId
  const zaps = await prismaclient.zap.findMany({
    where: {
      id:zapid,
      userId: id
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

export const zapRouter = router;

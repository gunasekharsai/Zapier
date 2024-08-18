import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function authmiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload) {
      //@ts-ignore
      req.id = payload.id;
      next();
    }
  } catch (error) {
    return res.status(403).json({
        message:"you are not logged in"
    })
  }
}

import express from 'express'
import { userRouter } from './router/user';
import { zapRouter } from './router/zap';
import cors from 'cors'
import { triggerrouter } from './router/triggers';
import { actionrouter } from './router/action';


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerrouter)
app.use("/api/v1/action", actionrouter)
app.listen(3003);
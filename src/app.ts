import express, { type Request, type Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Welcome to tour management app");
})


export default app;
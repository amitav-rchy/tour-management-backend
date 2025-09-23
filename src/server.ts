import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { enVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(enVars.DB_URL);
        console.log("Connected to DB");

        server = app.listen(5000, () => {
            console.log("Server is listening to port 5000");
        })
    }
    catch (err) {
        console.log(err)
    }
}
startServer();

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection Detected, Server is shutting down...", err);
    if(server){
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception Detected, Server is shutting down...", err);
    if(server){
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("SIGTERM", (err) => {
    console.log("sigterm signal received, Server is shutting down...", err);
    if(server){
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})



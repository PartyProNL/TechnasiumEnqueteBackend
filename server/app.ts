require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

import "reflect-metadata"
import { DataSource } from "typeorm"
import { AppDataSource } from "./dataSource"
import express, { json, Request, Response } from "express"
import cors from "cors"
import { ResponseController } from "./controller/responseController"

console.log("Server is starting...")

AppDataSource.initialize().then(async (dataSource: DataSource) => {
    console.log("Server is ready!")
    console.log("Connected to database: " + dataSource.options.database)

    const port = process.env.API_PORT || 5555
    const app = express()

    app.use(json())
    app.use(cors())
    
    app.use('/response', new ResponseController().router)

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)

        app.get("/", (request: Request, response: Response) => {
            response.json({ message: "Hello World!" })
        })
    })
})
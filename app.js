import express from 'express';
import 'dotenv/config'
import './modules/product/product.model.js'
import {modelInitial} from "./config/model.initial.js";
import morgan from "morgan";
import {allRoutes} from "./routes/allRoutes.js";
import cors from 'cors'

async function main() {

    const app = express()
    app.use(express.static('public'))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(morgan("dev"))
    app.use(cors())
    await modelInitial()
    app.use("/api", allRoutes)
    app.use((req, res, next) => {

        return res.status(404).json({
            message: `not found route`
        })
    })

    app.use((err, req, res, next) => {
        const statusCode = err?.status ?? err?.statusCode ?? 500
        let messageError = err?.message ?? "internal server error"

        if (err?.name == "ValidationError") {
            const {details} = err
            messageError = details?.body?.[0]?.message ?? "internal server error"
        }

        return res.status(statusCode).json({
            messageError,

        })
    })

    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Express server started http://localhost:${port}`)
    })
}

main()
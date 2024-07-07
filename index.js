import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import crudRoutes from "./routes/crudRoutes.js";
import pool from "./model/pool.js";
dotenv.configDotenv();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

pool.connect()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `connected to ${process.env.DB_NAME} and PORT ${process.env.PORT}`
            );
        });
    })
    .catch((e) => {
        console.error(e);
    });

app.use("/app/v1", crudRoutes);

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";

import {userRouter} from "./routers/userRouter.js"
import {articleRouter} from "./routers/articleRouter.js"


dotenv.config();
const port = process.env.PORT;
const dbURI = process.env.DBURI;

const app = express();
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`this app is running in port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/users",userRouter)
app.use("/articles",articleRouter)


import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import sampleRouter from "./routes/api.js";
import { signup, signin, protect } from "./utils/auth.js";
export const app = express();
dotenv.config();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.post("/signup", signup);
app.post("/signin", signin);
// app.use("/test", sampleRouter);

const port = process.env.PORT || 9000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server Running on Port: http://localhost:${port}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

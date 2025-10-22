import  Express  from "express";
import router from "./routers/router";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB";

dotenv.config();
const app = Express();

const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(Express.json());

app.use("/", router);

connectDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

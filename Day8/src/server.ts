import  Express  from "express";
import router from "./routers/index";
import dotenv from "dotenv";
import { config } from "./config/envConfig";
import { connectDB } from "./config/connectDB";
import {errorHandler} from "./middleware/erroMiddleware"
dotenv.config({ path: ".env.development" });
const app = Express();

const port = config.PORT || 4000;

// Middleware to parse JSON bodies
app.use(Express.json());

app.use("/api", router);
app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};
startServer();
  
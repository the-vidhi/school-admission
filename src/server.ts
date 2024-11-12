import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import logger from "morgan";
import { connectDB } from "./config/database";
import { validateEnvSchema } from "./config/env";
import indexRouter from "./app/routes/index.router";

const app: Express = express();
const port = process.env.PORT || 3000;

// cors options
const corsOptions = {
  origin: [process.env.FRONTEND_URL!],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// logger
app.use(logger("dev"));
// json data parser
app.use(express.json());
// body parser
app.use(express.urlencoded({ extended: false }));
// cookie parser to handle cookies in requests and responses
app.use(cookieParser());
// cors middleware to allow cross-origin requests from the frontend server
app.use(cors(corsOptions));

// routes
app.use("/", indexRouter);


// starts the application
app.listen(port, async () => {
  // validates environment variables
  await validateEnvSchema();

  // connects to the database and logs success message if connected successfully
  await connectDB();

  console.log("\x1b[35m%s\x1b[0m", `[server]: Server is running at:`, "\u001b[1;35m", `http://localhost:${port}`);

});

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/docs/swagger.json";

import entryRoutes from "./routes/entry.route";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/entries", entryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;

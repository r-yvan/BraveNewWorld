import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));

// Proxy configurations
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
  })
);

app.use(
  "/api/parkings",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);

app.use(
  "/api/entries",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
  })
);

app.use(
  "/api/reports",
  createProxyMiddleware({
    target: "http://localhost:5004",
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API Gateway is running!" });
});

app.listen(PORT, () => {
  console.log(`API Gateway is listening on port ${PORT}`);
});
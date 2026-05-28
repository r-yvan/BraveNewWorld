import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("parkings", "routes/parkings.tsx"),
  route("entries", "routes/entries.tsx"),
  route("reports", "routes/reports.tsx"),
] satisfies RouteConfig;

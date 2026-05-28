import app from "./app";

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Report Service is running on port ${PORT}`);
});

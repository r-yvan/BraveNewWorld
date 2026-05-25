import app from "./app";

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Parking Service is running on port ${PORT}`);
});

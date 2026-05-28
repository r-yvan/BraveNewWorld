import { registerUserService } from "./src/services/auth.service";

async function run() {
  try {
    const user = await registerUserService({
      firstName: "Yvan",
      lastName: "Rubuto",
      email: "yvankiliye.rubuto@gmail.com",
      password: "password123",
      role: "PARKING_ATTENDANT" as any
    });
    console.log("Success:", user);
    process.exit(0);
  } catch (e) {
    console.error("Error:", e);
    process.exit(1);
  }
}

run();

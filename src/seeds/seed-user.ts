import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const {
  NODE_ENV,
  MONGODB_URI_DEV,
  MONGODB_URI_PROD,
  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_TEMP_PASSWORD,
} = process.env;

const uri = NODE_ENV === "production" ? MONGODB_URI_PROD : MONGODB_URI_DEV;

if (!uri) {
  throw new Error("MongoDB URI is not defined for this environment.");
}

const mongoUri: string = uri;

const adminEmail = ADMIN_EMAIL?.trim();
const adminUsername = ADMIN_USERNAME?.trim();
const adminPassword = ADMIN_TEMP_PASSWORD?.trim();

if (!adminEmail || !adminUsername || !adminPassword) {
  throw new Error("Admin user environment variables are not properly defined.");
}

async function seedAdmin(): Promise<void> {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding.");

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      if (existingUser.role !== "admin") {
        existingUser.role = "admin";
        await existingUser.save();
        console.log(`Updated user ${adminEmail} to admin role.`);
      } else {
        console.log(`Admin user ${adminEmail} already exists.`);
      }
      return;
    }

    const passwordHash = await bcrypt.hash(adminPassword!, 10);

    const adminUser = new User({
      email: adminEmail,
      username: adminUsername,
      passwordHash,
      role: "admin",
      mustChangePassword: true,
    });

    await adminUser.save();

    console.log(`Admin user created in ${NODE_ENV} database:`, {
      email: adminEmail,
      username: adminUsername,
    });
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error("Error seeding admin user:", err);
    process.exit(1);
  });

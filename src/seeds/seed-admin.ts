import bcrypt from "bcryptjs";
import User from "../models/User";
import dbConnect, { dbDisconnect } from "../lib/mongodb";

const {
  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_TEMP_PASSWORD,
} = process.env;

const adminEmail = ADMIN_EMAIL?.trim();
const adminUsername = ADMIN_USERNAME?.trim();
const adminPassword = ADMIN_TEMP_PASSWORD?.trim();

if (!adminEmail || !adminUsername || !adminPassword) {
  throw new Error("Admin user environment variables are not properly defined.");
}

async function seedAdmin(): Promise<void> {
  try {
    await dbConnect();
    console.log("Connected to MongoDB for seeding.");

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      if (existingUser.role !== "admin") {
        existingUser.role = "admin";
        existingUser.mustChangePassword = true
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

    console.log(`Admin user ${adminUsername} created`, {
      email: adminEmail,
      username: adminUsername,
    });
  } finally {
    await dbDisconnect();
  }
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((err: unknown) => {
    console.error("Error seeding admin user:", err);
    process.exit(1);
  });

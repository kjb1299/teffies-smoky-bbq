import bcrypt from "bcryptjs";
import User from "../models/User";
import dbConnect, { dbDisconnect } from "../lib/mongodb";

const {
  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_TEMP_PASSWORD,
  NODE_ENV
} = process.env;

const adminEmail = ADMIN_EMAIL?.trim();
const adminUsername = ADMIN_USERNAME?.trim();
const adminPassword = ADMIN_TEMP_PASSWORD?.trim();

async function seedAdmin(): Promise<void> {
  try {
    await dbConnect();
    const isProd = NODE_ENV === "production";
    
    console.log(`Running in ${isProd ? "PRODUCTION" : "DEVELOPMENT"} mode.`);

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      if (isProd) {
        console.log(`[SAFE] Admin ${adminEmail} already exists. Skipping seed.`);
        return;
      } else {
        await User.deleteOne({ email: adminEmail });
        console.log(`[RESET] Existing dev admin ${adminEmail} deleted.`);
      }
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

    console.log(`[SUCCESS] Admin user "${adminUsername}" ${isProd ? "Bootstrapped" : "Reset"}:`, {
      email: adminEmail,
      env: isProd ? "PRODUCTION" : "DEVELOPMENT"
    });

  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  } finally {
    await dbDisconnect();
  }
}

seedAdmin();
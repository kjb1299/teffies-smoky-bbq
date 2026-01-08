import dbConnect from "./src/lib/mongodb.js";

async function test() {
  try {
    const conn = await dbConnect();
    console.log("✅ Database connected:", conn.connection.host);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
}

test();

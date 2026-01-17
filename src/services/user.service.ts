import "server-only";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function getAdminByUsername(username: string) {
  await dbConnect();
  return await User.findOne({
     username: { $regex: new RegExp(`^${username.trim()}$`, "i") },
    role: "admin",
  })
  .select("+passwordHash") 
  .lean();
}

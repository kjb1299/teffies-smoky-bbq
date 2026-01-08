import mongoose from "mongoose";

const uri =
      process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI_PROD
        : process.env.MONGODB_URI_DEV;

if (!uri) {
    throw new Error('MongoDB connection string is not defined in environment variables');
}

/* Global cached connection to prevent multiple connections in dev */

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn)
    {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
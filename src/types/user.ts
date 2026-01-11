export interface IUser extends Document {
  email: string;
  passwordHash: string;
  username: string;
  role: "user" | "admin";
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  mustChangePassword: boolean;
}
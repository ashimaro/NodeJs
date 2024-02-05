
import mongoose, { Document } from 'mongoose';
import { UserSchema } from './user.schema';

export interface User extends Document {
  id:string;
  username: string;
  password: string; 
  displayusername: string;
  timestamp :string;
}

export const UserModel = mongoose.model<User>('User', UserSchema);

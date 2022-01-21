import mongoose, { Document, Schema } from 'mongoose';

interface IBaseUser {
  _id: mongoose.ObjectId;
  groupIds: mongoose.ObjectId[];
  email: string;
  firstName: string;
  lastName: string;
}

export interface IUser extends IBaseUser {}

export interface UserDocument extends IUser, Omit<Document, '_id'> {}

export const UserSchema = new Schema<UserDocument>({
  groupIds: {
    type: [Schema.Types.ObjectId],
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

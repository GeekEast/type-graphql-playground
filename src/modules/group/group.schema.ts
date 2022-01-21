import mongoose, { Document, Schema } from 'mongoose';

interface IBaseGroup {
  _id: mongoose.Types.ObjectId;
  name: string;
}

export interface IGroup extends IBaseGroup {}

export interface GroupDocument extends IGroup, Omit<Document, '_id'> {}

export const GroupSchema = new Schema<GroupDocument>({
  name: {
    type: String,
    require: true,
  },
});

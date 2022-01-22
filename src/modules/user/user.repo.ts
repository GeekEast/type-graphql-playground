import { Inject, Service } from 'typedi';
import mongoose from 'mongoose';
import { IUser, UserDocument } from './user.schema';
import {
  IFilterGetUser,
  IFilterGetUserCount,
  IFilterGetUsers,
} from './user.type';

@Service()
export class UserRepo {
  @Inject('mongoose.userPrimaryModel')
  userPrimaryModel: mongoose.Model<UserDocument>;

  @Inject('mongoose.userSecondaryModel')
  userSecondaryModel: mongoose.Model<UserDocument>;

  async getOneById({ _id }: IFilterGetUser): Promise<IUser> {
    return this.userSecondaryModel.findOne({ _id }).lean();
  }

  async getManyByIds({ _ids }: IFilterGetUsers): Promise<IUser[]> {
    return this.userSecondaryModel.find({ _id: { $in: _ids } }).lean();
  }

  async getUserCountByGroupId({
    groupId,
  }: IFilterGetUserCount): Promise<number> {
    return this.userSecondaryModel
      .find({
        groupIds: { $elemMatch: { $eq: groupId } },
      })
      .countDocuments();
  }
}

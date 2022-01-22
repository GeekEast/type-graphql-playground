import { Inject, Service } from 'typedi';
import mongoose from 'mongoose';
import { IUser, UserDocument } from './user.schema';
import { IFilterGetUser, IFilterGetUsers } from './user.type';

@Service()
export class UserRepo {
  @Inject('mongoose.userPrimaryModel')
  userPrimaryModel: mongoose.Model<UserDocument>;

  @Inject('mongoose.userSecondaryModel')
  userSecondaryModel: mongoose.Model<UserDocument>;

  async getOneById({ _id }: IFilterGetUser): Promise<IUser> {
    return this.userSecondaryModel.findOne({ _id });
  }

  async getManyByIds({ _ids }: IFilterGetUsers): Promise<IUser[]> {
    return this.userSecondaryModel.find({ _id: { $in: _ids } });
  }
}

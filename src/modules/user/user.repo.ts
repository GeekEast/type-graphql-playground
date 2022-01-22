import { Inject, Service } from 'typedi';
import mongoose from 'mongoose';
import { IUser, UserDocument } from './user.schema';
import {
  IFilterGetUser,
  IFilterGetUserCount,
  IFilterGetUserCounts,
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

  async getUserCountsByGroupIds({
    groupIds,
  }: IFilterGetUserCounts): Promise<
    Record<string, { totalUsers: number; name: string }>
  > {
    const groupObjectIds = groupIds.map((id) => mongoose.Types.ObjectId(id));
    const result = await this.userSecondaryModel.aggregate([
      {
        $match: {
          groupIds: {
            $in: groupObjectIds,
          },
        },
      },
      {
        $unwind: {
          path: '$groupIds',
        },
      },
      {
        $match: {
          groupIds: {
            $in: groupObjectIds,
          },
        },
      },
      {
        $group: {
          _id: {
            userId: '$_id',
            groupId: '$groupIds',
          },
          userId: {
            $first: '$_id',
          },
          groupId: {
            $first: '$groupIds',
          },
        },
      },
      {
        $group: {
          _id: '$groupId',
          userCount: {
            $sum: 1.0,
          },
        },
      },
      {
        $lookup: {
          from: 'groups',
          localField: '_id',
          foreignField: '_id',
          as: 'data',
        },
      },
      {
        $project: {
          _id: 0.0,
          groupId: {
            $convert: {
              input: '$_id',
              to: 'string',
            },
          },
          userCount: 1.0,
          // ! not scale at all
          name: { $arrayElemAt: ['$data.name', 0.0] },
        },
      },
      {
        $group: {
          _id: null,
          mappings: {
            $push: '$$ROOT',
          },
        },
      },
      {
        $project: {
          _id: 0.0,
          groupIdUserCount: {
            $arrayToObject: {
              $map: {
                input: '$mappings',
                as: 'el',
                in: {
                  k: '$$el.groupId',
                  v: '$$el',
                },
              },
            },
          },
        },
      },
    ]);
    return result[0].groupIdUserCount;
  }
}

// ObjectId("61eb8e8b3fc821b4d36b0514"),
// ObjectId("61eb8e8b03fa698c171dd40f"),
// ObjectId("61eb8e8bb64fed62f6364d42")

import { Inject, Service } from 'typedi';
import mongoose from 'mongoose';
import { IUser, UserDocument } from './user.schema';
import {
  IFilterGetUser,
  IFilterGetUserCount,
  IFilterGetUsersByGroupId,
  IFilterGetUsers,
  IFilterGetUserCounts,
  IFilterGetGroupIdUsersMappingByGroupIds,
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

  async getUsersByGroupId({
    groupId,
  }: IFilterGetUsersByGroupId): Promise<IUser[]> {
    return this.userSecondaryModel.find({
      groupIds: { $elemMatch: { $eq: groupId } },
    });
  }

  async getUserCountsByGroupIds({
    groupIds,
  }: IFilterGetUserCounts): Promise<Record<string, number>> {
    const groupObjectIds = groupIds.map((id) => mongoose.Types.ObjectId(id));
    const groupIdUserCountsList = (await this.userSecondaryModel.aggregate([
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
          totalUsers: {
            $sum: 1.0,
          },
        },
      },
      {
        $project: {
          _id: 0.0,
          groupId: '$_id',
          totalUsers: 1.0,
        },
      },
    ])) as [groupIdUserCountPair];

    type groupIdUserCountPair = {
      groupId: mongoose.Types.ObjectId;
      totalUsers: number;
    };

    const groupIdUserCountMappings = groupIdUserCountsList.reduce(
      (prev: Record<string, number>, curr: groupIdUserCountPair) => ({
        ...prev,
        [curr.groupId.toHexString()]: curr.totalUsers,
      }),
      {}
    );
    return groupIdUserCountMappings;
  }

  async getGroupUsersMappingByGroupIds({
    groupIds,
  }: IFilterGetGroupIdUsersMappingByGroupIds): Promise<
    Record<string, IUser[]>
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
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $addFields: {
          user: {
            $arrayElemAt: ['$user', 0.0],
          },
        },
      },
      {
        $group: {
          _id: '$_id.groupId',
          users: {
            $addToSet: '$$ROOT.user',
          },
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
          users: 1.0,
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
          groupIdUsersMappings: {
            $arrayToObject: {
              $map: {
                input: '$mappings',
                as: 'el',
                in: {
                  k: '$$el.groupId',
                  v: '$$el.users',
                },
              },
            },
          },
        },
      },
    ]);
    return result[0].groupIdUsersMappings;
  }
}

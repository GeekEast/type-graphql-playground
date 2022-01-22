import { IFilterGetGroup, IFilterGetGroups } from './group.type';
import { Inject, Service } from 'typedi';
import { GroupDocument, IGroup } from './group.schema';
import mongoose from 'mongoose';

@Service()
export class GroupRepo {
  @Inject('mongoose.groupPrimaryModel')
  groupPrimaryModel: mongoose.Model<GroupDocument>;

  @Inject('mongoose.groupSecondaryModel')
  groupSecondaryModel: mongoose.Model<GroupDocument>;

  async getOneById({ _id }: IFilterGetGroup): Promise<IGroup> {
    return this.groupSecondaryModel.findOne({ _id });
  }

  async getManyByIds({ _ids }: IFilterGetGroups): Promise<IGroup[]> {
    return this.groupSecondaryModel.find({ _id: { $in: _ids } });
  }
}

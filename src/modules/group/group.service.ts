import { GetGroupDto } from './dtos/getGroup.dto';
import { GroupRepo } from './group.repo';
import { Inject, Service } from 'typedi';
import { GroupEntity } from './group.entity';
import { GetGroupsDto } from './dtos/getGroups.dto';

@Service()
export class GroupService {
  @Inject()
  groupRepo: GroupRepo;

  async getGroup(getGroupDto: GetGroupDto): Promise<GroupEntity> {
    const group = await this.groupRepo.getOneById(getGroupDto);

    const groupEntity = GroupEntity.fromRepoObject(group);
    return groupEntity;
  }

  async getGroups(getGroupsDto: GetGroupsDto): Promise<GroupEntity[]> {
    const groups = await this.groupRepo.getManyByIds(getGroupsDto);

    const groupEntities = groups.map((group) =>
      GroupEntity.fromRepoObject(group)
    );
    return groupEntities;
  }
}

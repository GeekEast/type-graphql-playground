import { UserService } from '../user/user.service';
import { GetGroupDto } from './dtos/getGroup.dto';
import { GroupRepo } from './group.repo';
import { Inject, Service } from 'typedi';
import { GroupEntity } from './group.entity';
import { GetGroupsDto } from './dtos/getGroups.dto';

@Service()
export class GroupService {
  @Inject()
  groupRepo: GroupRepo;

  @Inject()
  userService: UserService;

  async getGroup(getGroupDto: GetGroupDto): Promise<GroupEntity> {
    const groupRepoObject = await this.groupRepo.getOneById(getGroupDto);

    const userCount = await this.userService.getUserCountByGroupId({
      groupId: getGroupDto._id,
    });

    // assemble group before converting to groupEntity
    const group = { ...groupRepoObject, userCount };
    const groupEntity = GroupEntity.fromRepoObject(group);
    return groupEntity;
  }

  async getGroups(getGroupsDto: GetGroupsDto): Promise<GroupEntity[]> {
    // * ✅ Solution 1: make it as only 1 db query
    // * ✅ Solution 2: add index to user's groupIds:
    // * Solution 3: add working daemon for long-running task based on solution 1
    // * ref: https://docs.mongodb.com/manual/core/index-multikey/#query-on-the-array-field-as-a-whole

    const groupWithUserCount = await this.userService.getUserCountsByGroupIds({
      groupIds: getGroupsDto._ids,
    });
    const groupEntities = getGroupsDto._ids.map((id) =>
      GroupEntity.fromRepoObject({ _id: id, ...groupWithUserCount[id] })
    );
    return groupEntities;
  }
}

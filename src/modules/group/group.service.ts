import { UserService } from './../user/user.service';
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
    const groupEntity = GroupEntity.fromRepoObject(groupRepoObject);
    return groupEntity;
  }

  async getGroups(getGroupsDto: GetGroupsDto): Promise<GroupEntity[]> {
    const groupObjects = await this.groupRepo.getManyByIds(getGroupsDto);
    const groupEntities = groupObjects.map((groupRepoObject) =>
      GroupEntity.fromRepoObject(groupRepoObject)
    );
    return groupEntities;
  }
}

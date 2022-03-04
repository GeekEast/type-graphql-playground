import { GetGroupDto } from './dtos/getGroup.dto';
import DataLoader from 'dataloader';
import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { GroupEntity } from './group.entity';
import { GroupService } from './group.service';
import { GetGroupsDto } from './dtos/getGroups.dto';

@Service()
@Resolver(() => GroupEntity) // ! important here for field resolver
export class GroupResolver {
  @Inject()
  groupService: GroupService;

  @Inject()
  userService: UserService;

  // * ============================================= Field Resolvers ======================================
  // * First Approach
  @FieldResolver(() => UserEntity)
  async users(
    @Root() groupEntity: GroupEntity
  ): Promise<(UserEntity | Error)[]> {
    const userIds = await this.userService.getUserIdsByGroupId({
      groupId: groupEntity._id,
    });
    const loader = new DataLoader<string, UserEntity>(
      async (uniqueUserIds: readonly string[]): Promise<UserEntity[]> => {
        const users = await this.userService.getUsers({
          _ids: uniqueUserIds as string[],
        });

        const dict = users.reduce(
          (prev: Record<string, UserEntity>, curr: UserEntity) => ({
            ...prev,
            [curr._id]: curr,
          }),
          {}
        );

        return uniqueUserIds.map((userId) => dict[userId]);
      }
    );
    return loader.loadMany(userIds);
  }

  // * Second Approach
  @FieldResolver(() => UserEntity)
  async users2(@Root() groupEntity: GroupEntity): Promise<UserEntity[]> {
    const loader = new DataLoader<string, UserEntity[]>(
      async (uniqueGroupIds: readonly string[]): Promise<UserEntity[][]> => {
        const groupIdUsersMapping =
          await this.userService.getGroupIdUsersMapping({
            groupIds: uniqueGroupIds as string[],
          });
        return uniqueGroupIds.map((groupId) => groupIdUsersMapping[groupId]);
      }
    );
    return loader.load(groupEntity._id);
  }

  // ! Best Optimized
  @FieldResolver()
  async userCount(@Root() groupEntity: GroupEntity): Promise<number> {
    const loader = new DataLoader<string, number>(
      async (groupIds: readonly string[]): Promise<number[]> => {
        const groupIdUserCountMapping =
          await this.userService.getUserCountsByGroupIds({ groupIds } as {
            groupIds: string[];
          });

        return groupIds.map((groupId) => groupIdUserCountMapping[groupId]);
      }
    );
    return loader.load(groupEntity._id);
  }

  // * ====================================== Query & Mutation ============================================
  @Query(() => GroupEntity, { name: 'GetGroup' })
  async getGroup(
    @Arg('filter') getGroupDto: GetGroupDto
  ): Promise<GroupEntity> {
    return this.groupService.getGroup(getGroupDto);
  }

  @Query(() => [GroupEntity], { name: 'GetGroups' })
  async getGroups(
    @Arg('filter') getGroupsDto: GetGroupsDto
  ): Promise<GroupEntity[]> {
    return this.groupService.getGroups(getGroupsDto);
  }
}

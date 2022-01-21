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
@Resolver()
export class GroupResolver {
  @Inject()
  groupService: GroupService;

  @Inject()
  userService: UserService;

  // * ============================================= Data Loaders =========================================
  // private usersDataLoader = new DataLoader<string, UserEntity>(
  //   async (groupIds: readonly string[]): Promise<UserEntity[]> => {
  //     return;
  //   }
  // );

  // * ============================================= Field Resolvers ======================================
  // @FieldResolver()
  // async customer(@Root() groupEntity: GroupEntity): Promise<UserEntity> {
  //   return this.usersDataLoader.load('');
  // }

  // * ====================================== Query & Mutation ============================================
  @Query(() => GroupEntity, { name: 'GetGroup' })
  async filter(@Arg('filter') getGroupDto: GetGroupDto): Promise<GroupEntity> {
    return;
  }

  @Query(() => [GroupEntity], { name: 'GetGroups' })
  async getGroups(
    @Arg('filter') getGroupsDto: GetGroupsDto
  ): Promise<[GroupEntity]> {
    return;
  }
}

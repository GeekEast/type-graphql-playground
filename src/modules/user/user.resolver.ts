import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GetUserDto } from './dtos/getUser.dto';
import { GetUsersDto } from './dtos/getUsers.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Service()
@Resolver()
export class UserResolver {
  @Inject()
  userService: UserService;

  @Query(() => UserEntity, { name: 'GetUser' })
  async getGroup(@Arg('filter') getGroupDto: GetUserDto): Promise<UserEntity> {
    return this.userService.getUser(getGroupDto);
  }

  @Query(() => [UserEntity], { name: 'GetUsers' })
  async getGroups(
    @Arg('filter') getGroupsDto: GetUsersDto
  ): Promise<UserEntity[]> {
    return this.userService.getUsers(getGroupsDto);
  }
}

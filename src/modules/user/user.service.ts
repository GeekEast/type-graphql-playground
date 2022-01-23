import { GetUsersDto } from './dtos/getUsers.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { UserEntity } from './user.entity';
import { UserRepo } from './user.repo';
import { Inject, Service } from 'typedi';
import { GetUserCountDto } from './dtos/getUserCount.dto';
import { GetUserIdsByGroupIdDto } from './dtos/getUserIdsByGroupId.dto';
import { GetUserCountsDto } from '../group/dtos/getUserCounts.dto';
import { GetGroupIdUsersMappingDto } from './dtos/getGroupIdUsersMapping.dto';
import { IUser } from './user.schema';

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepo;

  async getUser(getUserDto: GetUserDto): Promise<UserEntity> {
    const user = await this.userRepo.getOneById(getUserDto);

    const userEntity = UserEntity.fromRepoObject(user);
    return userEntity;
  }

  async getUsers(getUsersDto: GetUsersDto): Promise<UserEntity[]> {
    const users = await this.userRepo.getManyByIds(getUsersDto);

    const userEntities = users.map((user) => UserEntity.fromRepoObject(user));
    return userEntities;
  }

  async getUserCountByGroupId(
    getUserCountDto: GetUserCountDto
  ): Promise<number> {
    return this.userRepo.getUserCountByGroupId({ ...getUserCountDto });
  }

  async getUserCountsByGroupIds(
    getUserCountsDto: GetUserCountsDto
  ): Promise<Record<string, number>> {
    // groupId:userCount mapping
    return this.userRepo.getUserCountsByGroupIds({ ...getUserCountsDto });
  }

  async getUserIdsByGroupId(
    getUserIdsByGroupIdDto: GetUserIdsByGroupIdDto
  ): Promise<string[]> {
    const usersRepoObj = await this.userRepo.getUsersByGroupId(
      getUserIdsByGroupIdDto
    );

    const users = usersRepoObj.map((userRepoObject) => {
      return UserEntity.fromRepoObject(userRepoObject);
    });

    return users.map((user) => user._id);
  }

  async getGroupIdUsersMapping(
    getGroupIdUsersMappingDto: GetGroupIdUsersMappingDto
  ): Promise<Record<string, UserEntity[]>> {
    const groupIdUserRepoObjectMappings =
      await this.userRepo.getGroupUsersMappingByGroupIds(
        getGroupIdUsersMappingDto
      );

    let groupIdUserMappings: Record<string, UserEntity[]> = {};

    Object.keys(groupIdUserRepoObjectMappings).map((groupId) => {
      const userRepoObjects: IUser[] = groupIdUserRepoObjectMappings[groupId];
      const users = userRepoObjects.map((userRepoObject) =>
        UserEntity.fromRepoObject(userRepoObject)
      );
      groupIdUserMappings[groupId] = users;
    });
    return groupIdUserMappings;
  }
}

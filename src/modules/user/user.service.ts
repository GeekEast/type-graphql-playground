import { GetUsersDto } from './dtos/getUsers.dto';
import { GetUserDto } from './dtos/getUser.dto';
import { UserEntity } from './user.entity';
import { UserRepo } from './user.repo';
import { Inject, Service } from 'typedi';
import { GetUserCountDto } from './dtos/getUserCount.dto';

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepo;

  async getUser(getUserDto: GetUserDto): Promise<UserEntity> {
    const user = await this.userRepo.getOneById(getUserDto);

    console.log(user);
    const userEntity = UserEntity.fromRepoObject(user);
    console.log(userEntity);
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
}

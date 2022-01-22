import { IUser } from './user.schema';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { Field, ID, ObjectType } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@ObjectType()
export class UserEntity {
  @Field(() => ID)
  @Expose({ toClassOnly: true })
  // ! avoid using value
  @Transform(({ obj }: { obj: IUser }) => obj._id?.toString(), {
    toClassOnly: true,
  })
  _id: string;

  @Field(() => String)
  @Expose({ toClassOnly: true })
  email: string;

  @Field(() => String)
  @Expose({ toClassOnly: true })
  firstName: string;

  @Field(() => String)
  @Expose({ toClassOnly: true })
  lastName: string;

  @Field(() => [String])
  @Expose({ toClassOnly: true })
  @Transform(
    ({ obj }: { obj: IUser }) =>
      obj.groupIds?.map((groupId) => groupId?.toString()),
    { toClassOnly: true }
  )
  groupIds: string[];

  static fromRepoObject(user: IUser): UserEntity {
    if (!user) return null;
    return plainToInstance(UserEntity, user, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}

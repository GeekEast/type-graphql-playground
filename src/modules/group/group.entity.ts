import { UserEntity } from './../user/user.entity';
import { IGroup } from './group.schema';
import { Field, ID, ObjectType } from 'type-graphql';
import { Service } from 'typedi';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

@Service()
@ObjectType()
export class GroupEntity {
  @Field(() => ID)
  @Expose({ toClassOnly: true })
  // ! avoid using value
  @Transform(({ obj }: { obj: IGroup }) => obj._id?.toString(), {
    toClassOnly: true,
  })
  _id: string;

  @Field(() => String)
  @Expose({ toClassOnly: true })
  name: string;

  @Field(() => Number)
  @Expose({ toClassOnly: true })
  @Transform(({ obj }) => obj.userCount || 0, { toClassOnly: true })
  userCount: number;

  @Field(() => UserEntity, { nullable: true })
  @Expose({ toClassOnly: true })
  @Type(() => UserEntity)
  users: [UserEntity];

  static fromRepoObject(obj: any): GroupEntity {
    if (!obj) return null;
    return plainToInstance(GroupEntity, obj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}

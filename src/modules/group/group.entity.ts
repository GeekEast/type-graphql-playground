import { IGroup } from './group.schema';
import { Field, ID, ObjectType } from 'type-graphql';
import { Service } from 'typedi';
import { Expose, plainToInstance, Transform } from 'class-transformer';

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
  @Transform(() => 0, { toClassOnly: true })
  userCount: number;

  static fromRepoObject(group: IGroup): GroupEntity {
    if (!group) return null;
    return plainToInstance(GroupEntity, group, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}

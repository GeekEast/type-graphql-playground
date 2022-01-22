import { IGroup } from './group.schema';
import { Field, ID, ObjectType } from 'type-graphql';
import { Service } from 'typedi';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { isValidObjectId } from 'mongoose';

@Service()
@ObjectType()
export class GroupEntity {
  @Field(() => ID)
  @Expose({ toClassOnly: true })
  // ! avoid using value
  @Transform(
    ({ obj }: { obj: IGroup }) =>
      isValidObjectId(obj?._id) ? obj._id.toString() : obj?._id,
    {
      toClassOnly: true,
    }
  )
  _id: string;

  @Field(() => String)
  @Expose({ toClassOnly: true })
  name: string;

  @Field(() => Number)
  @Expose({ toClassOnly: true })
  @Transform(({ obj }) => obj.userCount || 0, { toClassOnly: true })
  userCount: number;

  static fromRepoObject(obj: any): GroupEntity {
    if (!obj) return null;
    return plainToInstance(GroupEntity, obj, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
  }
}

import { Field, ID, ObjectType } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@ObjectType()
export class GroupEntity {
  @Field(() => ID)
  _id: string;
}

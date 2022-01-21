import { Field, InputType } from 'type-graphql';
import { GroupEntity } from '../group.entity';

@InputType()
export class GetGroupDto {
  @Field()
  _id: string;

  @Field({ defaultValue: true })
  activeOnly: boolean;
}

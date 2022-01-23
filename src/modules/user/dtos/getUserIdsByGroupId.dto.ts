import { IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetUserIdsByGroupIdDto {
  @Field(() => String)
  @IsMongoId()
  groupId: string;
}

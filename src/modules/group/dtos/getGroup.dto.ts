import { IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetGroupDto {
  @Field(() => String)
  @IsMongoId()
  _id: string;
}

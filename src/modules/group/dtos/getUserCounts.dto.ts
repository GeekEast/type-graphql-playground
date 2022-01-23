import { ArrayNotEmpty, IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetUserCountsDto {
  @Field(() => [String])
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  groupIds: string[];
}

import { ArrayNotEmpty, IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetGroupsDto {
  @Field(() => [String])
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  _ids: string[];
}

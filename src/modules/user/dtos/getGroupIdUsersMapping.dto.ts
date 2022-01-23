import { ArrayNotEmpty, IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetGroupIdUsersMappingDto {
  @Field(() => [String])
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  groupIds: string[];
}

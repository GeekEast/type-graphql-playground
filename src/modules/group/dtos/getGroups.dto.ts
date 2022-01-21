import { Field, InputType } from 'type-graphql';

@InputType()
export class GetGroupsDto {
  @Field(() => [String], { nullable: true })
  _ids?: string[];
}

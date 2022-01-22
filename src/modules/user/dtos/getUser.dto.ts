import { IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class GetUserDto {
  @Field(() => String)
  @IsMongoId()
  _id: string;
}

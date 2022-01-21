import { Resolver } from 'type-graphql';
import { Service } from 'typedi';

@Service()
@Resolver()
export class UserResolver {}

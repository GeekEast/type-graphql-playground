import { MongooseProvider } from './mongoose.provider';

export const registerProviders = async () => {
  await MongooseProvider.provide();
};

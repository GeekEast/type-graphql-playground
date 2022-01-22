import mongoose, { Schema } from 'mongoose';
import pluralize from 'pluralize';
import { Container } from 'typedi';
import {
  OFFLINE_DOCUMENTDB_PRIMARY_URI,
  OFFLINE_DOCUMENTDB_SECONDARY_URI,
} from '../const';
import { GroupDocument, GroupSchema } from '../modules/group/group.schema';
import { UserDocument, UserSchema } from '../modules/user/user.schema';

export class MongooseProvider {
  static primaryDB: mongoose.Connection;
  static secondaryDB: mongoose.Connection;

  static async provide() {
    await this.initMongoConnection();

    // * register all models here
    this.registerModel<UserDocument>('user', UserSchema);
    this.registerModel<GroupDocument>('group', GroupSchema);
  }

  // ============= private method area ============
  private static registerModel<T>(modelName: string, schema: Schema<T>) {
    if (
      Container.has(`mongoose.${modelName}PrimaryModel`) &&
      Container.has(`mongoose.${modelName}SecondaryModel`)
    ) {
      return;
    }

    const modelPluralName = pluralize(modelName);

    const primaryModel = this.primaryDB.model<T>(
      modelName,
      schema,
      modelPluralName
    );

    const secondaryModel = this.secondaryDB.model<T>(
      modelName,
      schema,
      modelPluralName
    );

    Container.set(`mongoose.${modelName}PrimaryModel`, primaryModel);
    Container.set(`mongoose.${modelName}SecondaryModel`, secondaryModel);
  }

  private static async initMongoConnection() {
    if (this.primaryDB && this.secondaryDB) return;

    let primaryDBUri = OFFLINE_DOCUMENTDB_PRIMARY_URI;
    let secondaryDBUri = OFFLINE_DOCUMENTDB_SECONDARY_URI;

    console.log(primaryDBUri);
    this.primaryDB = await mongoose.createConnection(primaryDBUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: false,
    });

    this.secondaryDB = await mongoose.createConnection(secondaryDBUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      autoIndex: false,
    });
  }
}

import {DefaultCrudRepository} from '@loopback/repository';
import {Userinfo, UserinfoRelations} from '../models';
import {MongodsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserinfoRepository extends DefaultCrudRepository<
  Userinfo,
  typeof Userinfo.prototype.id,
  UserinfoRelations
> {
  constructor(
    @inject('datasources.mongods') dataSource: MongodsDataSource,
  ) {
    super(Userinfo, dataSource);
  }
}

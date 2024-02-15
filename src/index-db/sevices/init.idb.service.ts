import { Injectable } from '@angular/core';
import Dexie, { TableSchema } from 'dexie';
import { DBSongs } from './idb.song.model';
import {
  IDexieTableSchema,
  ITableSchema,
} from '../index-db-interfaces/idb.interface';
import { LoadedSongs } from '../model/loaded.songs';
import { ICategory } from '../index-db-interfaces/category.interfaces';
import { IPost } from '../index-db-interfaces/post.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AppDatabase extends Dexie {
  Post!: Dexie.Table<IPost, number>;
  Category!: Dexie.Table<ICategory, number>;
  LoadedSongs!: Dexie.Table<LoadedSongs, number>;

  versionNumber: number = 2;
  private dbName: string = 'index-db-songs';
  constructor() {
    super('index-db-songs');
    this.setIndexDbTable();
    this.seedData();
  }

  seedData() {
    this.on('populate', async () => {
      await this.LoadedSongs.add(new LoadedSongs());
    });
  }

  setIndexDbTable() {
    this.version(this.versionNumber).stores(this.setTablesSchema());
    console.log('database initialized');
    this.Post = this.table(DBSongs.Post.TableName);
    this.Category = this.table(DBSongs.Category.TableName);
  }

  private setTablesSchema() {
    return Object.entries(DBSongs).reduce((tables, [key, value]) => {
      tables[value.TableName] = value.Columns;
      return tables;
    }, {} as Record<string, string>);
  }

  async migrateDB() {
    if (await Dexie.exists(this.dbName)) {
      const declaredSchema = this.getCanonicalComparableSchema(this);
      const dynDb = new Dexie(this.dbName);
      const installedSchema = await dynDb
        .open()
        .then(this.getCanonicalComparableSchema);
      dynDb.close();
      if (declaredSchema !== installedSchema) {
        console.log('Db schema is not updated, so deleting the db.');
        await this.clearDB();
      }
    }
  }

  getCanonicalComparableSchema(db: Dexie): string {
    const tableSchemas: ITableSchema[] = db.tables.map((table) =>
      this.getTableSchema(table)
    );
    return JSON.stringify(
      tableSchemas.sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  }

  getTableSchema(table: {
    name: string;
    schema: IDexieTableSchema;
  }): ITableSchema {
    const { name, schema } = table;
    const indexSources = schema.indexes.map((idx) => idx.src).sort();
    const schemaString = [schema.primKey.src, ...indexSources].join(',');
    return { name, schema: schemaString };
  }

  async clearDB() {
    console.log('deleting DB...');
    this.close();
    await this.delete();
    await this.open();
    console.log('DB deleted.');
  }
}

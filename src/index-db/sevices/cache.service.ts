import { Injectable } from '@angular/core';
import { DexieCrudService } from './dexie-crud.service';
import { IUser } from '../index-db-interfaces/user.interface';
import { IUnit } from '../index-db-interfaces/unit.interface';
import { AppDatabase } from './init.idb.service';
import { LoadedSongs } from '../model/loaded.songs';
import { ICategory } from '../index-db-interfaces/category.interfaces';
import { IPost } from '../index-db-interfaces/post.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  Post!: DexieCrudService<IPost, number>;
  Category!: DexieCrudService<ICategory, number>;
  LoadedSongs!: DexieCrudService<LoadedSongs, number>;

  constructor(appDatabase: AppDatabase) {
    this.Post = new DexieCrudService<IPost, number>(appDatabase.Post);
    this.Category = new DexieCrudService<ICategory, number>(appDatabase.Category);
    this.LoadedSongs = new DexieCrudService<LoadedSongs, number>(
      appDatabase.LoadedSongs
    );
  }
}

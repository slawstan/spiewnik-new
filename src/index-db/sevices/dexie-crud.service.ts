import { Inject, Injectable } from '@angular/core';
import { Collection, Dexie } from 'dexie';
import { IFilterDelegate } from '../index-db-interfaces/idb.interface';
import { Post } from '../index-db-interfaces/post.interfaces';

export class DexieCrudService<T, Tkey> {
  dbSet: Dexie.Table<T, Tkey>;

  constructor(dbSet: Dexie.Table<T, Tkey>) {
    this.dbSet = dbSet;
  }

  getAll(filterDelegate: IFilterDelegate | undefined = undefined) {
    if (!!filterDelegate) {
      return filterDelegate(this.dbSet).toArray();
    }
    return this.dbSet.toArray();
  }

  async AddBulkAsync(items: T[]) {
    const batchSize = 1000;
    let processed = 0;

    while (processed < items.length) {
      const batch = items.slice(processed, processed + batchSize);
      await this.dbSet.bulkPut(batch);
      processed += batchSize;
    }
  }

  getById(id: Tkey) {
    return this.dbSet.get(id);
  }

  getByCatId(catId: Tkey) {
    //this.dbSet.mapToClass(Post).
    return this.dbSet.where({categories: catId}).toArray();
  }

  async AddAsync(item: T): Promise<void> {
    await this.dbSet.add(item);
  }

  async AddOrEditAsync(item: T): Promise<void> {
    await this.dbSet.put(item);
  }

  async UpdateAsync(id: Tkey, changes: Partial<T>): Promise<void> {
    await this.dbSet.update(id, changes);
  }

  async RemoveAsync(id: Tkey): Promise<void> {
    await this.dbSet.delete(id);
  }

  async RemoveRangeAsync(ids: Tkey[]): Promise<void> {
    await this.dbSet.bulkDelete(ids);
  }
  async RemoveAllAsync(ids: Tkey[]): Promise<void> {
    await this.dbSet.clear();
  }
}

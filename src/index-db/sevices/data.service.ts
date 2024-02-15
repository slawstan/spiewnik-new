import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { EntityStateEnum } from '../enum/idb.enum';
import { ChunkLoadStrategy } from '../index-db-interfaces/api-base-response.interface';
import { IEntitySyncDTO } from '../index-db-interfaces/idb.interface';
import { CacheService } from './cache.service';
import { ApiHandlerService } from './http-service/api-handler.service';
import { Post } from '../index-db-interfaces/post.interfaces';

@Injectable({ providedIn: 'root' })
export class DataService {
  private refreshSubject: Subject<IEntitySyncDTO> = new Subject();

  constructor(
    private apiService: ApiHandlerService,
    private cacheService: CacheService
  ) {}

  apiData: any = '';

  get refreshObserver(): Observable<IEntitySyncDTO> {
    return this.refreshSubject.asObservable();
  }

  /**
   *
   * @param repo Name of EntityRepo to be used
   * @param endpoint API Endpoint with API URL
   * @returns list of data fetched from api or cache
   */
  async getListAsync(
    repo: string,
    endpoint: string,
    filterDelegate: any = undefined,
    chunkLoadStrategy: ChunkLoadStrategy | undefined = undefined
  ) {
    // get data from api first if availble
    try {
      this.apiData =
      chunkLoadStrategy === undefined
        ? await this.apiService.GetAll(endpoint).toPromise()
        : await this.apiService.GetAllChunks(endpoint, chunkLoadStrategy);
    }
    catch{
      let cacheData = await (this.cacheService as any)[repo].getAll(
        filterDelegate
      );
       // if cache data is available then return the data
      let isCachedDataAvailable = cacheData?.length > 0;
      if ( isCachedDataAvailable || (!isCachedDataAvailable && (await this.isSongLoaded(repo))))
      {
        return cacheData;
      }
    }
    if(this.apiData != '' && Object.getOwnPropertyNames(this.apiData).length >0)
    {
          await (this.cacheService as any)[repo].RemoveAllAsync();
          await (this.cacheService as any)[repo].AddBulkAsync(this.apiData);
          await this.loadClientDbSong(repo);
          if (!!filterDelegate) {
            return await (this.cacheService as any)[repo].getAll(filterDelegate);
          }

          this.updateCache(this.apiData);

          return this.apiData
        } else {
          let cacheData = await (this.cacheService as any)[repo].getAll(
            filterDelegate
          );
           // if cache data is available then return the data
          let isCachedDataAvailable = cacheData?.length > 0;
          if ( isCachedDataAvailable || (!isCachedDataAvailable && (await this.isSongLoaded(repo))))
          {
            return cacheData;
          }
        // TODO
        // if some error occurs then show a dialog
        console.error('Error in Data Service: ', this.apiData);
      }
  }

  async updateCache(data: IEntitySyncDTO) {
    //if store is not loaded then no need of sync notification
    if (!(await this.isSongLoaded(data.Table))) {
      return;
    }

    // add record to cache
    if (data.State == EntityStateEnum.Added) {
      await (this.cacheService as any)[data.Table].AddOrEditAsync(data.Entity);
    }
    // delete record from cache
    if (data.State == EntityStateEnum.Deleted) {
      let entity: any = data.Entity;
      await (this.cacheService as any)[data.Table].RemoveAsync(entity.Id);
    }
    // update record from cache
    if (data.State == EntityStateEnum.Modified) {
      let entity: any = data.Entity;
      await (this.cacheService as any)[data.Table].UpdateAsync(
        entity.Id,
        entity
      );
    }
    this.refreshSubject.next(data);
  }

  async isSongLoaded(storeName: string) {
    let record = await this.cacheService.LoadedSongs.getById(1);
    if (record && (record as any)[storeName] == true) {
      return true;
    }
    return false;
  }

  async getPostById(id: number) {
    return await this.cacheService.Post.getById(id);
  }

  async getPostsByCategoryId(catId: number) {
    return await this.cacheService.Post.getByCatId(catId);
  }

  async loadClientDbSong(songName: string) {
    let patch = {};
    (patch as any)[songName] = true;
    await this.cacheService.LoadedSongs.UpdateAsync(1, { ...patch });
  }



}



import { Category } from '../index-db-interfaces/category.interfaces';
import { Post } from '../index-db-interfaces/post.interfaces';
import { LoadedSongs } from '../model/loaded.songs';
import { Unit } from '../model/unit.model';
import { User } from '../model/user.model';

const postInstance = new Post();
const categoryInstance = new Category();
const loadedSongsInstance = new LoadedSongs();

// Define a generic function to generate columns with a constraint
function generateColumns<T extends Record<string, any>>(instance: T): string {
  return (Object.keys(instance) as (keyof T)[]).join(',');
}

export const DBSongs = {
  Category: {
    TableName: 'Category',
    Columns: generateColumns(categoryInstance),
  },
  Post: {
    TableName: 'Post',
    Columns: generateColumns(postInstance),
  },
  LoadedSongs: {
    TableName: 'LoadedSongs',
    Columns: generateColumns(loadedSongsInstance),
  },
};

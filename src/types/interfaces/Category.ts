import { Acf } from "./Acf";

export interface Category {
  id?: number,
  count?: number,
  description?: string,
  link?: string,
  name?: string,
  slug?: string,
  taxonomy?: string,
  acf?: Acf
  obraz_kategorii?: string,
}

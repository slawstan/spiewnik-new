export interface IAcfCat {
  obraz_kategorii?: string,
  data_do_kolejnosci?: string,
}

export class AcfCat implements IAcfCat {
  obraz_kategorii = '';
  data_do_kolejnosci = '';
}

export interface ICategory {
  id?: number,
  count?: number,
  description?: string,
  link?: string,
  name?: string,
  slug?: string,
  taxonomy?: string,
  acf?: IAcfCat
  obraz_kategorii?: string,
}

export class Category implements ICategory {
  id = 0;
  count= 0;
  description= '';
  link = '';
  name = '';
  slug = '';
  taxonomy = ''
  acf= new AcfCat();
  obraz_kategorii = '';
}


import { SafeHtml } from "@angular/platform-browser";

export interface IAcfPost {
  waznosc: string,
}

export class AcfPost implements IAcfPost{
  waznosc = '';
}

export interface ITitle {
  rendered: SafeHtml,
}

export class Title implements ITitle {
  rendered = "";
}


export interface IPost {
  id: number,
  title: ITitle
  content: {rendered: SafeHtml},
  categories: Number[],
  slug: string,
  acf: IAcfPost,
}

export class Post implements IPost {
  id = 0;
  title = new Title();
  content = {rendered:''};
  categories = [];
  slug = '';
  acf = new AcfPost();
}



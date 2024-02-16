import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/index-db/sevices/data.service';
import { API_ENDPOINTS } from '../constants/endpoints';
import { ICategory } from 'src/index-db/index-db-interfaces/category.interfaces';
import { IPost, Post } from 'src/index-db/index-db-interfaces/post.interfaces';
import { DBSongs } from 'src/index-db/sevices/idb.song.model';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Global } from '../global';
import animateScrollTo from 'animated-scroll-to';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent  implements OnInit {

  categories: ICategory[] =[];
  posts: IPost[] =[];
  categories2: ICategory[] =[];
  post: IPost = {  } as Post;
  catId: string = '';
  category:string = "";
  search:string = "";
  allPosts: IPost[] =[]as Post[];
  postId: string = "";
  faCoffee = faCoffee;
  @Input() wpis: IPost = {} as Post;
  @Input() ranger:number = 0;
  rozmiarCzcionki: number = 20; // Rozmiar czcionki na początku (wartość domyślna)
  htmlString:string = '';
  musicKey: number = 0;
  fontSize:any = 20;
  t:number = 0;

  defaultOptions = {
    cancelOnUserAction: true,
    easing: (t:number)=>t,
    elementToScroll: window,
    horizontalOffset: 0,
    maxDuration: 200000,
    minDuration: 200000,
    speed: 60,
    verticalOffset: 0,
  };


  constructor(private dataService: DataService,
    private service: CategoriesService, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private element:ElementRef){}

    open(path: string) {
      this.router.navigateByUrl(path);
    }

  async ngOnInit() {

    const postsConst: IPost[] = [] as Post[];

    this.categories = (await this.dataService.getListAsync(
      DBSongs.Category.TableName,
      API_ENDPOINTS.category,
    )) as ICategory[];
    this.categories2 = this.categories;

    this.posts = (await this.dataService.getListAsync(
      DBSongs.Post.TableName,
      API_ENDPOINTS.post,
    )) as IPost[];

    this.route.queryParams.subscribe(async params => {
      this.category = params['categ'];
      this.catId = params['catId'];
      this.postId = params['postId'];
      this.search = this.search = params['search'];
      console.log(this.catId);

      if (this.postId != null)
      {
        //this.postId = this.route.snapshot.paramMap.get('id') || '';
        this.post = (await this.dataService.getPostById(Number(this.postId))) as IPost;
        this.wpis = this.post;
      }
      else if(this.catId != null)
      {
          const categoryId = this.catId;
          this.posts.forEach(function (post) {
            post.categories.forEach(function (val) {
                if(String(val) == categoryId) {
                  postsConst.push(post);
                }
                })
            });
      }
      this.posts = postsConst.sort((a, b) => (a.acf.waznosc < b.acf.waznosc ? -1 : 1));
      console.log(this.posts);
    });
  }

  zmienRozmiarCzcionki(akcja: 'zmniejsz' | 'zwieksz') {
    if (akcja === 'zmniejsz') {
      this.rozmiarCzcionki -= 1; // Możesz dostosować wartość zmniejszenia
    } else if (akcja === 'zwieksz') {
      this.rozmiarCzcionki += 1; // Możesz dostosować wartość zwiększenia
    }
  }

  fontRange() {
      this.rozmiarCzcionki = this.fontSize;
  }


  transpose(akcja: 'up' | 'down') {
    var elements = document.querySelectorAll('code');

    if (akcja === 'up') {
      this.musicKey++;
    }
    else if (akcja === 'down') {
      this.musicKey--;
    }

    let tonac:number = this.musicKey;
    if(tonac < 0){
      tonac = tonac +11;
    }
    if(tonac > 11){
      tonac = tonac - 11;
    }
    else if(tonac < - 11){
      tonac = tonac + 11;
    }

    if(this.musicKey > 11){
      this.musicKey = this.musicKey - 11;
    }
    else if(this.musicKey < - 11){
      this.musicKey = this.musicKey + 11;
    }

    elements.forEach((e) => {
        let songChord: string = e.getAttribute("data-chord")?? '';
        let sufix: string = e.getAttribute("data-suffix")?? '';
        let local: string = e.getAttribute("data-local")?? '';
        let display: string = e.innerHTML;
        let chordInOctave:string = (songChord.includes('#') && local.includes('is'))?local.charAt(0).toUpperCase()+"is":local.charAt(0).toUpperCase();

        let newTone:string = '';
        let newOcataveElement = Global.octave;
        let ocataveElement = Global.octave.filter(x => x.local == chordInOctave);
        let newIndex:number = ocataveElement[0].id + tonac;
        if (newIndex > 11){
          newIndex = newIndex - 12;
        }

        newOcataveElement = Global.octave.filter(x => x.id == newIndex);
        newTone= newOcataveElement[0].display;
        if(sufix.includes('m')) {
          newTone = newTone.toLowerCase();
        }
        newTone = newTone+sufix.replace('m','');
        e.innerHTML = newTone;
    })
}

  getSafeHtml(html: string|undefined): SafeHtml {
    this.htmlString = html ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlString);
  }

  getSafeIframeHtml(html:string|undefined): SafeHtml {
    this.htmlString = html ?? '';
    return this.getSafeHtml(this.htmlString);
  }

  goBack() {
    window.history.back();
  }

  scroll(){
    let el = document.getElementById('end');
    if(el != null){
      animateScrollTo(el, this.defaultOptions);
    }
  }
}

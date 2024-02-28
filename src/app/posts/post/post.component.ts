import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Global } from 'src/app/global';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import animateScrollTo from 'animated-scroll-to';
import { DataService } from 'src/index-db/sevices/data.service';
import { IPost, Post } from 'src/index-db/index-db-interfaces/post.interfaces';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  faCoffee = faCoffee;
  @Input() wpis: IPost = {} as Post;
  post: IPost = {} as Post;
  @Input() ranger:number = 0;
  postId:string = '';
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

  constructor(private dataService: DataService, private postsService: PostsService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private element:ElementRef){}

  open(path: string) {
    this.router.navigateByUrl(path);
  }

  async ngOnInit() {

    let edit:boolean;

    this.postId = this.route.snapshot.paramMap.get('id') || '';
    this.post = (await this.dataService.getPostById(Number(this.postId))) as IPost;
    this.wpis = this.post;

console.log(this.post.content.rendered);
console.log(this.post.content);

    //this.wpis.title.rendered = this.getSafeHtml(String(this.post.content.rendered));
    this.wpis.content.rendered = this.getSafeHtml(String(this.post.content.rendered));

    this.route.params.subscribe(params=>{
      let id:number = params['id'];
      let url:string[] = this.router.url.split('/');
      edit = url[3] == 'edit';
      //this.postId = id;

    });




    /*  this.route.params.subscribe(async params=>{
        let id:number = params['id'];
        let url:string[] = this.router.url.split('/');
        edit = url[3] == 'edit';
        try
        {
          this.post = (await this.dataService.getPostById(id)) as IPost;

          this.wpis = this.post;

          this.wpis.rendered = this.getSafeHtml(this.post.content?.rendered);

          //this.postsService.getPost(id).subscribe((pst) => {
          //this.wpis = pst;
          //this.wpis.rendered = this.getSafeHtml(pst.content?.rendered);

          //});
        }
        catch{
          this.goBack();
        }
    });
        */
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

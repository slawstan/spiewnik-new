import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Global } from '../global';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SplashScreenComponent implements OnInit {

windowWidth: string = "";
showSplash: boolean = true;
opacityChange: number = 1;
splashTransition: string = '';

@Input() animationDuration: number = 0.5;
@Input() duration: number = 3;

constructor(){
  const isShowSplash = sessionStorage.getItem('isShowSplash');
  if (isShowSplash) {
    this.showSplash = false;
  } else {
        this.showSplash = true;
  }
  sessionStorage.setItem('isShowSplash', JSON.stringify(false));
}

  ngOnInit(): void {
    setTimeout(()=>{
      this.splashTransition = 'opacity '+ this.animationDuration + 's';
      this.opacityChange = 0;
      setTimeout(()=>{
        this.showSplash = false;
      }, this.animationDuration * 1000)
    }, this.duration *1000)
  }

}

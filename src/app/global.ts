import {
  HttpHeaders,
} from '@angular/common/http';
import { Chord } from 'src/types/interfaces/Chord';
export class Global {

  public static appJwtUrl: string = 'https://slawek-staniec.pl/blogapp/wp-json/jwt-auth/v1';
  public static apiUrl: string = 'https://slawek-staniec.pl/blogapp/wp-json/wp/v2';
  public static headers = new HttpHeaders().set('Content-Type', 'application/json');
  //public static appName: string = "Example Site";
  //public static appLogo: string = "assets/images/logo.png";
  ///public static appEmail: string = "johndoe@example.com";

  public static chords: Chord[] = [
    { prevTone: 'H', chord: 'C', nextTone: 'Cis'},
    { prevTone: 'C', chord: 'Cis', nextTone: 'D'},
    { prevTone: 'Cis', chord: 'D', nextTone: 'Dis'},
    { prevTone: 'D', chord: 'Dis', nextTone: 'E'},
    { prevTone: 'Dis', chord: 'E', nextTone: 'F'},
    { prevTone: 'E', chord: 'F', nextTone: 'Fis'},
    { prevTone: 'F', chord: 'Fis', nextTone: 'G'},
    { prevTone: 'Fis', chord: 'G', nextTone: 'Gis'},
    { prevTone: 'G', chord: 'Gis', nextTone: 'A'},
    { prevTone: 'Gis', chord: 'A', nextTone: 'B'},
    { prevTone: 'A', chord: 'B', nextTone: 'H'},
    { prevTone: 'B', chord: 'H', nextTone: 'C'},
  ];

  public static octave = [
    {id: 0, tone: "C", display:"C", local:"C"},
    {id: 1, tone: "C#", display:"Cis", local:"Cis"},
    {id: 2, tone: "D", display:"D", local:"D"},
    {id: 3, tone: "D#", display:"Dis", local:"Dis"},
    {id: 4, tone: "E", display:"E", local:"E"},
    {id: 5, tone: "F", display:"F", local:"F"},
    {id: 6, tone: "F#", display:"Fis", local:"Fis"},
    {id: 7, tone: "G", display:"G", local:"G"},
    {id: 8, tone: "G#", display:"Gis", local:"Gis"},
    {id: 9, tone: "A", display:"A", local:"A"},
    {id: 10, tone: "A#", display:"B", local:"B"},
    {id: 11, tone: "B", display:"H", local:"H"},
  ];
public static showSplash: boolean = true;

}

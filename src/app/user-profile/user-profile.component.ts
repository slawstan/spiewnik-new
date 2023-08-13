import { Component, OnInit } from '@angular/core';
import { User } from 'src/types/interfaces/User';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User = {
    username: '',
    password: '',
}
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id: string | null = "0";
    if((this.actRoute.snapshot.paramMap.get('id') == null) || (this.actRoute.snapshot.paramMap.get('id') == '0')) {
      id = localStorage.getItem('user');
    } else {
      id = this.actRoute.snapshot.paramMap.get('id');
    }
    this.authService.getUserProfile(id).subscribe((res) => {
      this.currentUser = res;
    });
  }
  ngOnInit() {}
}

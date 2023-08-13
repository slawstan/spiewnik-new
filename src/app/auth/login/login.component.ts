import { Component, OnInit } from '@angular/core';
import { LoginForm } from 'src/types/interfaces/Auth';
import { User } from 'src/types/interfaces/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: LoginForm = {
    email: '',
    password: '',
  }
  user: User = {
      username: '',
      password: '',
  }



  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  submit() {
    this.user.username = this.form.email;
    this.user.password = this.form.password;
    //this.authService.login(this.form);
    this.authService.signIn(this.user);

  }

  isLoading(){
    return this.authService.isLoading;
  }
}


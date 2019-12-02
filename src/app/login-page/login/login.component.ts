import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  login() {
    if (!this.authService.isAuthenticated()) {
      this.authService.login(this.email, this.password);
    }
  }

}

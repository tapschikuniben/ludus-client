import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  public hide = true;

  constructor(
    private router: Router
  ) {

  }

  onSubmit() {
    const url = `/courses`;
    this.router.navigate([url]);
  }

  ForgotPassword() { }
}

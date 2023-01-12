import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  @HostBinding('class') className = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Logout() {
    const url = `/admin-login`;
    this.router.navigate([url]);
  }

}

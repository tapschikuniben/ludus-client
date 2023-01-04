import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Pack {
  _id: string;
  title: string;
  instructor: string;
}

@Component({
  selector: 'app-pack-info',
  templateUrl: './pack-info.component.html',
  styleUrls: ['./pack-info.component.scss']
})
export class PackInfoComponent {

  public pack = { _id: '', title: '', instructor: '' };
  public returnPack: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  packs: Pack[] = [
    { _id: '1', title: 'Welcome To Trenches', instructor: 'Fergus Douchebag' },
    { _id: '2', title: 'Pack Name #2', instructor: 'Nathaneal Down' }
  ]

  editPack() {
    const url = `/edit-pack/`;
    this.router.navigate([url]);
  }

  addPack() {
    const url = `/add-pack/`;
    this.router.navigate([url]);
  }
}


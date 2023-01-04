import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Card {
  _id: string;
  title: string;
  points: Number;
}


@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {

  public card = { _id: '', title: '', points: 0 };
  public returnCard: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  cards: Card[] = [
    { _id: '1', title: 'First Time Login', points: 20 }
  ]

  editCard() {
    const url = `/edit-card/`;
    this.router.navigate([url]);
  }

  addCard() {
    const url = `/add-card/`;
    this.router.navigate([url]);
  }

}

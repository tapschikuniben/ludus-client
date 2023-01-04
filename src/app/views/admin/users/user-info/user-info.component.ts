import { Component } from '@angular/core';

interface User {
  _id: string;
  username: string;
  sport: string;
  profile_points: number;
  email: string;
  dob: string;
  nationality: string;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  public user = { _id: '', username: '', sport: '', profile_points: 0, email: '', dob: '', nationality: '' };
  public returnUser: any;
  public show: boolean = false;

  constructor(

  ) { }

  ngOnInit(): void {

  }


  users: User[] = [
    { _id: '1', username: 'Fergus Douchebag', sport: 'Football', profile_points: 125, email: 'fergus@mail.com', dob: '11/17/1990', nationality: 'British' },
    { _id: '2', username: 'Nathaneal Down', sport: 'Football', profile_points: 100, email: 'nathaneal@mail.com', dob: '01/12/1996', nationality: 'British' },
    { _id: '3', username: 'Wisteria Ravenclaw', sport: 'Football', profile_points: 5, email: 'nathaneal@mail.com', dob: '05/25/1992', nationality: 'Zimbabwe' },
  ]

  viewUser(user: any) {

    this.returnUser = this.users.filter(returned_user => {
      return returned_user._id === user._id;
    })

    this.show = true;
  }

  close() {
    this.show = false;;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pack } from 'src/app/models/pack.model';
import { PackService } from 'src/app/services/pack.service';

@Component({
  selector: 'app-new-pack',
  templateUrl: './new-pack.component.html',
  styleUrls: ['./new-pack.component.scss']
})
export class NewPackComponent {

  public pack!: Pack;

  constructor(
    private packService: PackService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initPack();
  }

  initPack() {
    this.pack = {
      _id: "",
      packs_images: [],
      number_of_weeks: 0,
      pack_title: "",
      pack_instructor: "",
      description: ""
    }
  }

  SavePack(pack: any) {
    this.packService.addPack(pack).subscribe(returned_pack => {
      console.log(returned_pack);
    })
  }

}

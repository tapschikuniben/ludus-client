import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pack } from 'src/app/models/pack.model';
import { PackService } from 'src/app/services/pack.service';


@Component({
  selector: 'app-pack-info',
  templateUrl: './pack-info.component.html',
  styleUrls: ['./pack-info.component.scss']
})
export class PackInfoComponent {

  public pack = { _id: '', title: '', instructor: '' };
  public returnPack: any;
  public packs: Pack[] = []

  constructor(
    private router: Router,
    private packService: PackService
  ) { }

  ngOnInit(): void {
    this.getPacks();
  }

  getPacks() {
    this.packService.getAllPacks().subscribe((returnedPacks: any) => {
      this.packs = returnedPacks;
    })
  }

  editPack(pack: any) {
    const url = `/edit-pack/${pack.id}`;
    this.router.navigate([url]);
  }

  addPack() {
    const url = `/add-pack/`;
    this.router.navigate([url]);
  }
}


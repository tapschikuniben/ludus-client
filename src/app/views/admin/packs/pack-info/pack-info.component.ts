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
  public packs: Pack[] = [];
  public loading: boolean = false;
  public available_packs: boolean = false;

  constructor(
    private router: Router,
    private packService: PackService
  ) { }

  ngOnInit(): void {
    this.getPacks();
  }

  getPacks() {
    this.loading = true;
    this.packService.getAllPacks().subscribe((returnedPacks: any) => {

      if (returnedPacks.length > 0) {
        this.packs = returnedPacks;

        this.available_packs = true;
      } else {
        this.available_packs = false;
      }
      this.loading = false;
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


import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pack, PackDaySession } from 'src/app/models/pack.model';
import { PackService } from 'src/app/services/pack.service';

@Component({
  selector: 'app-edit-pack',
  templateUrl: './edit-pack.component.html',
  styleUrls: ['./edit-pack.component.scss']
})
export class EditPackComponent {

  public pack!: Pack;
  public packSession!: PackDaySession;

  constructor(
    private route: ActivatedRoute,
    private packService: PackService,
  ) {

  }

  ngOnInit(): void {
    this.initPack();
    this.getPack();
  }

  initPack() {
    this.pack = {
      _id: '',
      packs_images: [],
      number_of_weeks: null,
      pack_title: '',
      pack_instructor: '',
      description: '',
      pack_daily_sessions: []
    }
  }

  initPackSession() {
    this.packSession = {
      category: "",
      day: "",
      is_article_or_vedio: "",
      title: "",
      description: "",
      preferences: [],
      imageUrl: "",
      vedioUrl: "",
      articleUrl: "",
    }
  }

  getPack() {

    const packId = this.route.snapshot.paramMap.get('id');

    this.packService.getPackById(packId).subscribe(returnedPack => {
      this.pack = returnedPack;
    })
  }
}

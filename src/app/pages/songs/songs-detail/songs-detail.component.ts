// src/app/pages/event/event-detail/event-detail.component.ts
import { Component, Input } from '@angular/core';
import { AuthService } from './../../../auth/auth.service';
import { UtilsService } from './../../../core/utils.service';
import { SongsModel } from './../../../core/models/songs.model';

@Component({
  selector: 'app-songs-detail',
  templateUrl: './songs-detail.component.html',
  styleUrls: ['./songs-detail.component.scss']
})
export class SongsDetailComponent {
  @Input() songs: SongsModel;

  constructor(
    public utils: UtilsService,
    public auth: AuthService) { }
}

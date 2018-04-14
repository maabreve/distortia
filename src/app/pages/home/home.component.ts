// src/app/pages/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { SongsModel } from './../../core/models/songs.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  pageTitle = 'Songs';
  songsListSub: Subscription;
  songsList: SongsModel[];
  filteredSongs: SongsModel[];
  loading: boolean;
  error: boolean;
  query: '';

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public fs: FilterSortService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getSongsList();
  }

  private _getSongsList() {
    this.loading = true;
    // Get future, public songs
    this.songsListSub = this.api
      .getSongs$()
      .subscribe(
        res => {
          this.songsList = res;
          this.filteredSongs = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  searchSongs() {
    this.filteredSongs = this.fs.search(this.songsList, this.query, '_id', 'mediumDate');
  }

  resetQuery() {
    this.query = '';
    this.filteredSongs = this.songsList;
  }

  ngOnDestroy() {
    this.songsListSub.unsubscribe();
  }

}

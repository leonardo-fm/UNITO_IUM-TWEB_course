import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubModel } from '../../models/club.model';
import { ClubService } from '../../services/club.service';
import { LoaderService } from '../../services/loader.service';
import { LanguageService } from '../../services/language.service';
import { ClubPlayersComponent } from './club-players/club-players.component';
import { ClubGamesComponent } from './club-games/club-games.component';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [ClubPlayersComponent, ClubGamesComponent],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit {

  club: ClubModel;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private clubService: ClubService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let clubId = params['id'];
      this.loaderService.show();
      this.clubService.getClubById(clubId).then(club => {this.club = club; console.log(this.club)}).finally(() => this.loaderService.hide());
    });
  }
}

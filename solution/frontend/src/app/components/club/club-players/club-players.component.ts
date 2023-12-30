import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { FormsModule } from '@angular/forms';
import { PlayerModel } from '../../../models/player.model';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { ClubService } from '../../../services/club.service';

@Component({
  selector: 'app-club-players',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './club-players.component.html',
  styleUrl: './club-players.component.css'
})
export class ClubPlayersComponent implements OnInit {
  filter: string;
  data: PlayerModel[];
  players: PlayerModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clubService: ClubService,
    private loaderService: LoaderService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        let clubId = params['id'];
        this.loaderService.show();
        this.clubService.getPlayersByClubId(clubId).then(players => {
          this.data = players;
          console.log(this.data)
          this.players = players;
        }).finally(() => this.loaderService.hide());
      })
  }

  onFilterPlayers(){
    let filter = this.filter.toLowerCase();
    this.players = this.data.filter(x =>
      x.name.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['club_players_position_'+x.position]?.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['club_players_sub_position_'+x.sub_position]?.toLowerCase().includes(filter)
    )
  }
}

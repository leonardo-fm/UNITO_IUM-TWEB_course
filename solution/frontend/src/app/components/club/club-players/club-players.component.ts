import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { ClubService } from '../../../services/club.service';
import { PlayerDto } from '../../../models/player.dto.model';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-club-players',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './club-players.component.html',
  styleUrl: './club-players.component.css'
})
export class ClubPlayersComponent implements OnInit {
  filter: string;
  data: PlayerDto[];
  players: PlayerDto[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private loaderService: LoaderService,
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let clubId = params['id'];
      this.loaderService.show();
      this.playerService.getPlayersByClubId(clubId)
        .then(players => {
          this.data = players;
          console.log(this.data)
          this.players = players;
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
    })
  }

  onFilterPlayers() {
    let filter = this.filter.toLowerCase();
    this.players = this.data.filter(x =>
      x.fullName.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['club_players_position_' + x.position]?.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['club_players_sub_position_' + x.subPosition]?.toLowerCase().includes(filter)
    )
  }
}

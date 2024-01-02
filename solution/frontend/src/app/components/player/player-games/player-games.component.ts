import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { GameService } from '../../../services/game.service';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { GameDto } from '../../../models/game.dto.model';

@Component({
  selector: 'app-player-games',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'd-flex flex-column' },
  templateUrl: './player-games.component.html',
  styleUrl: './player-games.component.css'
})
export class PlayerGamesComponent implements OnInit {
  groupedGames: GameDto[][];
  moment = moment;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let playerId = params['id'];
      this.loaderService.show();
      this.gameService.getPlayerGameHistory(playerId).then(games => {
        console.log(games);
        this.groupedGames = this.gameService.groupConsequentCompetitionGame(games);
      }).finally(() => this.loaderService.hide());
    })
  }
}

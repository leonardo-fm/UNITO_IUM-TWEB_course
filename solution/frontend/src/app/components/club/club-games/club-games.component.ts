import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { GameDto } from '../../../models/game.dto.model';

@Component({
  selector: 'app-club-games',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'd-flex flex-column' },
  templateUrl: './club-games.component.html',
  styleUrl: './club-games.component.css'
})
export class ClubGamesComponent implements OnInit {
  clubId: number;
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
      this.clubId = params['id'];
      this.loaderService.show();
      this.gameService.getClubGameHistory(this.clubId, 2023).then(games => {
        this.groupedGames = this.gameService.groupConsequentCompetitionGame(games);
      }).finally(() => this.loaderService.hide());
    })
  }

  winDrawLose(game: GameDto){
  let res;
    if (this.clubId == game.homeClubId)
      res = Number(game.homeClubScore) - Number(game.awayClubScore);
    else 
      res = Number(game.awayClubScore) - Number(game.homeClubScore)
    
    if (res > 0)
      return 'win';
    else if (res < 0)
      return 'lose';
    else return 'draw';
  }
}

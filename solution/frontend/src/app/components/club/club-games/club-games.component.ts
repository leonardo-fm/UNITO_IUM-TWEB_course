import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { GameModel } from '../../../models/game.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';

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
  groupedGames: GameModel[][];
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
      this.gameService.getClubGameHistory(this.clubId).then(games => {
        this.groupedGames = this.gameService.groupConsequentCompetitionGame(games);
      }).finally(() => this.loaderService.hide());
    })
  }

  winDrawLose(game: GameModel){
  let res;
    if (this.clubId == game.home_club_id)
      res = Number(game.home_club_goals) - Number(game.away_club_goals);
    else 
      res = Number(game.away_club_goals) - Number(game.home_club_goals)
    
    if (res > 0)
      return 'win';
    else if (res < 0)
      return 'lose';
    else return 'draw';
  }
}
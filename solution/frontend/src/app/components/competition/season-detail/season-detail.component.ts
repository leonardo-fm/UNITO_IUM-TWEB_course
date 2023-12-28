import { Component, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { GameModel } from '../../../models/game.model';
import { CompetitionService } from '../../../services/competition.service';
import { LanguageService } from '../../../services/language.service';
import { ClubStatistics } from '../../../models/club.model';

@Component({
  selector: 'app-season-detail',
  standalone: true,
  imports: [],
  host: { class: 'w-100' },
  templateUrl: './season-detail.component.html',
  styleUrl: './season-detail.component.css'
})
export class SeasonDetailComponent implements OnInit, OnDestroy {
  clubsStatistics: ClubStatistics[];
  moment = moment;

  gameHistorySubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService
  ) { }

  ngOnInit(): void {
    this.gameHistorySubscription = this.competitionService.gameHistorySubject.subscribe(games => {
      this.calculate(games);
    })
  }

  calculate(games: GameModel[]) {
    let groupedGames: any = {};
    this.clubsStatistics = [];

    games.forEach(game => {
      let home: ClubStatistics = groupedGames[game.home_club_id] = groupedGames[game.home_club_id] || new ClubStatistics();
      if (!home.club) home.club = game.home_club;
      home.games.push(game);
      home.goalsScored += Number(game.home_club_goals);
      home.goalsConceded += Number(game.away_club_goals);

      let away: ClubStatistics = groupedGames[game.away_club_id] = groupedGames[game.away_club_id] || new ClubStatistics();
      if (!away.club) away.club = game.away_club;
      away.games.push(game);
      away.goalsScored += Number(game.away_club_goals);
      away.goalsConceded += Number(game.home_club_goals);

      if (game.home_club_goals > game.away_club_goals) {
        home.wins++;
        away.loses++;
        home.points += 3;
      }
      else if (game.home_club_goals < game.away_club_goals) {
        away.wins++;
        home.loses++;
        away.points += 3;
      }
      else {
        home.draws++;
        away.draws++;
        home.points++;
        away.points++;
      }
    });
    for (let [key, clubGames] of Object.entries(groupedGames))
      this.clubsStatistics.push(<ClubStatistics>clubGames);
    this.clubsStatistics.sort((x, y) => y.points - x.points);
  }

  ngOnDestroy(): void {
    if (this.gameHistorySubscription) this.gameHistorySubscription.unsubscribe();
  }
}

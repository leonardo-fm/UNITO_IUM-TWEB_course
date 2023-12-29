import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameModel } from '../../../models/game.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'w-100' },
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit, OnDestroy {

  gameHistory: GameModel[];
  moment = moment;

  gameHistorySubscription: Subscription;

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService  
  ) { }

  ngOnInit(): void {
    this.gameHistorySubscription = this.competitionService.gameHistorySubject.subscribe(games => {
      this.gameHistory = games;
    })
  }

  ngOnDestroy(): void {
    if (this.gameHistorySubscription) this.gameHistorySubscription.unsubscribe();
  }
}

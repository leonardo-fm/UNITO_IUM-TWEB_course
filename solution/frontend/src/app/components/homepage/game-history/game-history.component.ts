import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import { GameHistoryModel } from '../../../models/game.model';
import moment from 'moment';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-game-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './game-history.component.html',
  styleUrl: './game-history.component.css'
})
export class GameHistoryComponent implements OnInit {
  
  public gameHistory: GameHistoryModel[];
  public moment = moment;

  constructor(
    private gameService: GameService,
    private loaderService: LoaderService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.gameService.getGameHistory()
      .then(res => this.gameHistory = res)
      .finally(() => this.loaderService.hide());
  }
}

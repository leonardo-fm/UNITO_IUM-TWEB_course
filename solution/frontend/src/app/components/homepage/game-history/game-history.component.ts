import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { GameService } from '../../../services/game.service';
import { GameHistoryModel } from '../../../models/game.model';
import moment from 'moment';
import { RouterLink } from '@angular/router';

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
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.gameService.getGameHistory().then(res => this.gameHistory = res);
  }
}

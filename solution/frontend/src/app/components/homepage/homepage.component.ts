import { Component } from '@angular/core';
import { CountryLeaguesComponent } from './country-leagues/country-leagues.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { GameService } from '../../services/game.service';
import { ScrollDirective } from '../../directives/scroll.directive';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CountryLeaguesComponent, GameHistoryComponent, ScrollDirective],
  host: { class: 'container d-flex flex-row h-100 w-100 overflow-auto py-4' },
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(
    private gameService: GameService 
  ) { }

  onScrollBottom(){
    this.gameService.gameHistoryScroll.next(null);
  }
}

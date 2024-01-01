import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CountryLeaguesComponent } from './country-leagues/country-leagues.component';
import { GameHistoryComponent } from './game-history/game-history.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CountryLeaguesComponent, GameHistoryComponent],
  host: { class: 'container d-flex flex-row h-100 w-100 overflow-auto py-4' },
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements AfterViewInit {
  @ViewChild('element') element: ElementRef;

  constructor(
    private gameService: GameService 
  ) { }

  ngAfterViewInit(): void {
    const componentEl: HTMLElement = this.element.nativeElement.parentElement;
    componentEl.onscroll = () => {
      if (componentEl.offsetHeight + componentEl.scrollTop >= componentEl.scrollHeight - 1) {
        this.gameService.gameHistoryScroll.next(null);
      }
    };
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompetitionService } from '../../services/competition.service';
import { GameHistoryComponent } from './game-history/game-history.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import { LoaderService } from '../../services/loader.service';
import { CompetitionDto } from '../../models/competition.dto.model';
import { LanguageService } from '../../services/language.service';
import { ChatRoomType } from '../../models/chat.dto.model';
import { ScrollDirective } from '../../directives/scroll.directive';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [GameHistoryComponent, SeasonDetailComponent, ReactiveFormsModule, RouterLink, ScrollDirective],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto py-4' },
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {

  competitionId: string;
  competition: CompetitionDto;
  choosedSeason = new FormControl<number>(0);
  ChatRoomType = ChatRoomType;

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.competitionId = params['id'];
      this.loaderService.show();
      this.competitionService.getCompetitionById(this.competitionId)
        .then(competition => {
          this.competition = competition;
          this.choosedSeason.patchValue(this.competition.seasons[0]);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
    });

    this.choosedSeason.valueChanges.subscribe(season => {
      this.competitionService.competitionSeasonSubject.next(Number(season));
    });
  }

  onScrollBottom(){
    this.competitionService.gameHistoryScroll.next(null);
  }
}

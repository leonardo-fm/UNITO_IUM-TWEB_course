import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../../services/competition.service';
import { GameHistoryComponent } from './game-history/game-history.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import { LoaderService } from '../../services/loader.service';
import { CompetitionDto } from '../../models/competition.dto.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [GameHistoryComponent, SeasonDetailComponent, ReactiveFormsModule],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto py-4' },
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {

  competitionId: string;
  competition: CompetitionDto;
  seasons: number[];
  choosedSeason = new FormControl<number>(0);

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.competitionId = params['id'];
      this.loaderService.show();
      this.competitionService.getCompetitionById(this.competitionId)
        .then(competition => this.competition = competition)
        .finally(() => this.loaderService.hide());
    });

    this.loaderService.show();
    this.competitionService.getAllSeason().then(res => {
      this.seasons = res.data;
      this.choosedSeason.patchValue(this.seasons[0]);
    }).finally(() => this.loaderService.hide());

    this.choosedSeason.valueChanges.subscribe(season => {
      this.competitionService.competitionSeasonSubject.next(Number(season));
    });
  }
}

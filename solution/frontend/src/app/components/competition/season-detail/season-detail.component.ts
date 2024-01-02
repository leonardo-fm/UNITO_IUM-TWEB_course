import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CompetitionService } from '../../../services/competition.service';
import { LanguageService } from '../../../services/language.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompetitionStatsDto } from '../../../models/competition.dto.model';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-season-detail',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'w-100' },
  templateUrl: './season-detail.component.html',
  styleUrl: './season-detail.component.css'
})
export class SeasonDetailComponent implements OnInit, OnDestroy {
  @Input() competitionId: string;

  seasonSubscription: Subscription;
  clubsStatistics: CompetitionStatsDto[];
  moment = moment;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private competitionService: CompetitionService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.competitionId = params['id'];
      if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
      this.seasonSubscription = this.competitionService.competitionSeasonSubject.subscribe(season => {
        this.loaderService.show();
        this.competitionService.getCompetitionStats(this.competitionId, season)
          .then(stats => this.clubsStatistics = stats)
          .finally(() => this.loaderService.hide());
      })
    })
  }

  ngOnDestroy(): void {
      if (this.seasonSubscription) this.seasonSubscription.unsubscribe();
  }
}

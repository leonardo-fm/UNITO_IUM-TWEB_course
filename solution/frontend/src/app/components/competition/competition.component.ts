import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionService } from '../../services/competition.service';
import { CompetitionModel } from '../../models/competition.model';
import { GameHistoryComponent } from './game-history/game-history.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [GameHistoryComponent, FormsModule],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto py-4' },
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {
  competition: CompetitionModel | undefined;
  seasons: number[];
  choosedSeason: number;

  constructor(
    private competitionService: CompetitionService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let comp_id = params['id'];
      this.competitionService.getCompetitionById(comp_id).then(x => this.competition = x);
    })
    this.competitionService.getAllSeason().then(res => {
      this.seasons = res.data;
      this.choosedSeason = this.seasons[0];
      this.onSeasonChange();
    });
  }

  onSeasonChange(){
    this.competitionService.seasonSubject.next(this.choosedSeason);
  }
}

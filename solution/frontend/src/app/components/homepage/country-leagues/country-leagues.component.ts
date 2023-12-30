import { Component, OnInit } from '@angular/core';
import { CompetitionModel } from '../../../models/competition.model';
import { CompetitionService } from '../../../services/competition.service';
import { LanguageService } from '../../../services/language.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-country-leagues',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './country-leagues.component.html',
  styleUrl: './country-leagues.component.css'
})
export class CountryLeaguesComponent implements OnInit {
  data: CompetitionModel[];
  competitions: any = {};
  competitionsByCountry: any[] = [];
  filter: string;

  constructor(
    private competitionService: CompetitionService,
    private loaderService: LoaderService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.competitionService.getAllCompetitions().then(res => {
      this.data = res.data;
      this.groupByCountry(this.data);
    }).finally(() => this.loaderService.hide());
  }

  groupByCountry(competitions: CompetitionModel[]) {
    this.competitions = {};
    for (let competition of competitions) {
      (this.competitions[competition.country_id] = this.competitions[competition.country_id] || []).push(competition);
    }
    this.competitionsByCountry = [];
    for (let [key, competition] of Object.entries(this.competitions)) {
      this.competitionsByCountry.push(competition);
    }
  }

  onExpand(element: HTMLElement) {
    element.classList.toggle('expand-open');
  }

  onFilterLeagues() {
    let filter = this.filter.toLowerCase();
    let filtered = this.data.filter(x =>
      x.name.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['homepage_country_name_' + x.country_id]?.toLowerCase().includes(filter)
    )
    this.groupByCountry(filtered);
  }
}

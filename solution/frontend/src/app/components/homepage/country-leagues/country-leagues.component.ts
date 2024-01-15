import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition.service';
import { LanguageService } from '../../../services/language.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { CompetitionDto } from '../../../models/competition.dto.model';
import { SvgDirective } from '../../../directives/svg.directive';

@Component({
  selector: 'app-country-leagues',
  standalone: true,
  imports: [FormsModule, RouterLink, SvgDirective],
  templateUrl: './country-leagues.component.html',
  styleUrl: './country-leagues.component.css'
})
export class CountryLeaguesComponent implements OnInit {
  data: CompetitionDto[];
  competitions: any = {};
  competitionsByCountry: any[] = [];
  filter: string;

  constructor(
    private competitionService: CompetitionService,
    private loaderService: LoaderService,
    private router: Router,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.competitionService.getAllCompetitions().then(competitions => {
      this.data = competitions;
      this.groupByCountry(this.data);
    })
    .catch(() => this.router.navigate(['/error']))
    .finally(() => this.loaderService.hide());
  }

  groupByCountry(competitions: CompetitionDto[]) {
    this.competitions = {};
    for (let competition of competitions) {
      (this.competitions[competition.countryId] = this.competitions[competition.countryId] || []).push(competition);
    }
    this.competitionsByCountry = [];
    for (let [key, competition] of Object.entries(this.competitions)) {
      this.competitionsByCountry.push(competition);
    }
    console.log(this.competitionsByCountry);
  }

  onExpand(element: HTMLElement) {
    element.classList.toggle('expand-open');
  }

  onFilterLeagues() {
    let filter = this.filter.toLowerCase();
    let filtered = this.data.filter(x =>
      x.name.toLowerCase().includes(filter) ||
      this.languageService.selectedLanguage['homepage_country_name_' + x.countryId]?.toLowerCase().includes(filter)
    )
    this.groupByCountry(filtered);
  }
}

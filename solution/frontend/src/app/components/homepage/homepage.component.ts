import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CompetitionService } from '../../services/competition.service';
import { FormsModule } from '@angular/forms';
import { CompetitionModel } from '../../models/competition.model';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [FormsModule],
  host: { class: 'container d-flex flex-row h-100 w-100 overflow-auto py-4' },
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  data: CompetitionModel[];
  competitions: any = {};
  competitionsByCountry: any[] = [];
  filter: string;

  constructor(
    private competitionService: CompetitionService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.competitionService.getAllCompetitions().then(res => {
      this.data = res.data;
      this.groupByCountry(this.data);
    });
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
    element.classList.toggle('expand-close');
  }

  onFilterLeagues() { 
    let filter = this.filter.toLowerCase();
    let filtered = this.data.filter(x => 
      x.name.toLowerCase().includes(filter) || 
      this.languageService.selectedLanguage['homepage_country_name_'+x.country_id]?.toLowerCase().includes(filter)
    )
    this.groupByCountry(filtered);
  }
}

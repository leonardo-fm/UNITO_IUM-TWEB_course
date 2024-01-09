import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchDto } from '../../models/search.dto.model';
import { LoaderService } from '../../services/loader.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto py-4' },
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchResults: SearchDto[];
  groupedSearch: SearchDto[][];

  constructor(
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['search']) {
        this.searchResults = [];
        return;
      }
      this.loaderService.show();
      this.utilsService.siteSearch(params['search']).then(res => {
        this.searchResults = res;
        let groupedSearch: any = {};
        for (let search of res) {
          (groupedSearch[search.entity] = groupedSearch[search.entity] || []).push(search);
        }
        this.groupedSearch = [];
        for (let [key, value] of Object.entries(groupedSearch)) {
          this.groupedSearch.push(<SearchDto[]>value);
        }
      }).finally(() => this.loaderService.hide());
    })
  }
}

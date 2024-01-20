import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { AvgGoalsStatisticsDto, WinDrawLoseStatisticsDto } from '../../../models/club.dto.model';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { ClubService } from '../../../services/club.service';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-club-statistics',
  standalone: true,
  imports: [NgChartsModule, ReactiveFormsModule],
  templateUrl: './club-statistics.component.html',
  styleUrl: './club-statistics.component.css',
})

export class ClubStatisticsComponent implements OnInit, OnDestroy {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  performancePerYear = new FormControl <number | null>(null);
  performancePerYears: number[];
  
  avgGoalsYear = new FormControl <number | null>(null);
  avgGoalsYears: number[];

  data1: WinDrawLoseStatisticsDto[] = [];
  data2: AvgGoalsStatisticsDto[] = [];

  public performanceChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public performanceChartOptions: ChartConfiguration<'line'>['options'] = { 
    responsive: true, 
    plugins: {legend: {position: 'bottom'}},
    scales: { x: {}, y: {beginAtZero: true}}
  };

  public avgGoalsChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public avgGoalsChartOptions: ChartOptions<'bar'> = { responsive: true, plugins: {legend: {position: 'bottom'}}, scales: { x: {}, y: {} } };

  private eventOnResize = this.onWindowResize.bind(this);
  private languageSubscription: Subscription;
  private themeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private clubService: ClubService,
    private router: Router,
    private utilsService: UtilsService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let clubId = params['id'];
      this.loaderService.show();
      Promise.all([this.clubService.getClubWinStatistics(clubId), this.clubService.getClubGoalStatistics(clubId)])
        .then(datas => {
          this.data1 = datas[0];
          this.performancePerYears = [...new Set(this.data1.map(x => x.year))];
          this.performancePerYear.patchValue(this.performancePerYears[Math.max(this.performancePerYears.length - 4, 0)]);
          
          this.data2 = datas[1];
          this.avgGoalsYears = [...new Set(this.data2.map(x => x.year))];
          this.avgGoalsYear.patchValue(this.avgGoalsYears[Math.max(this.avgGoalsYears.length - 4, 0)]);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
        
      this.performancePerYear.valueChanges.subscribe(() => this.updateData());
      this.avgGoalsYear.valueChanges.subscribe(() => this.updateData());
      this.themeSubscription = this.utilsService.themeSubject.subscribe(() => setTimeout(() => this.renderCharts(), 10));
    });

    addEventListener("resize", this.eventOnResize);
    this.languageSubscription = this.languageService.languageSubject.subscribe(() => this.updateData());
    this.avgGoalsYear.valueChanges.subscribe(() => this.updateData());
    this.performancePerYear.valueChanges.subscribe(() => this.updateData());
    
    this.avgGoalsYears = [...new Set(this.data2.map(x => x.year))];
    this.avgGoalsYear.patchValue(this.avgGoalsYears[Math.max(this.avgGoalsYears.length - 4, 0)]);

    this.performancePerYears = [...new Set(this.data1.map(x => x.year))];
    this.performancePerYear.patchValue(this.performancePerYears[Math.max(this.performancePerYears.length - 4, 0)]);
  }

  updateData() {
    var labels = new Set<number>();
    var wins: number[] = [], draws: number[] = [], loses: number[] = [];
    this.data1.filter(x => x.year >= (this.performancePerYear.value || 0))
      .forEach(x => {
        labels.add(x.year);
        wins.push(x.wins);
        draws.push(x.draws);
        loses.push(x.loses);
      });
    this.performanceChartData.labels = [...labels];
    this.performanceChartData.datasets = [
      { data: wins, label: this.languageService.selectedLanguage['club_statistics_wins'] },
      { data: draws, label: this.languageService.selectedLanguage['club_statistics_draws'] },
      { data: loses, label: this.languageService.selectedLanguage['club_statistics_loses'] },
    ];

    labels = new Set<number>();
    let grouped: {[key: string]: { [key: string]: number } } = {};
    this.data2.filter(x => x.year >= (this.avgGoalsYear.value || 0))
      .forEach(x => {
        labels.add(x.year);
        (grouped[x.competitionName] = grouped[x.competitionName] || {});
        grouped[x.competitionName][x.year] = x.avgGoals;
      });
    let groupedData: { [key: string]: number[] } = {};
    for (let [key, value] of Object.entries(grouped)){
      groupedData[key] = groupedData[key] || [];
      for (let year of labels)
        groupedData[key].push(value[year]);
    }

    this.avgGoalsChartData.labels = [...labels];
    this.avgGoalsChartData.datasets = [];
    for (let [key, value] of Object.entries(groupedData))
      this.avgGoalsChartData.datasets.push({ data: value, label: key });

    this.renderCharts();
  }

  onWindowResize() {
    this.renderCharts();
  }

  renderCharts() {
    let style = getComputedStyle(document.querySelector('[class$="-theme"]')!);
    this.performanceChartData.datasets[0].borderColor = style.getPropertyValue('--win');
    this.performanceChartData.datasets[0].pointBorderColor = style.getPropertyValue('--win');
    this.performanceChartData.datasets[0].pointBackgroundColor = style.getPropertyValue('--win');
    this.performanceChartData.datasets[0].backgroundColor = style.getPropertyValue('--win');

    this.performanceChartData.datasets[1].borderColor = style.getPropertyValue('--draw');
    this.performanceChartData.datasets[1].pointBorderColor = style.getPropertyValue('--draw');
    this.performanceChartData.datasets[1].pointBackgroundColor = style.getPropertyValue('--draw');
    this.performanceChartData.datasets[1].backgroundColor = style.getPropertyValue('--draw');

    this.performanceChartData.datasets[2].borderColor = style.getPropertyValue('--lose');
    this.performanceChartData.datasets[2].pointBorderColor = style.getPropertyValue('--lose');
    this.performanceChartData.datasets[2].pointBackgroundColor = style.getPropertyValue('--lose');
    this.performanceChartData.datasets[2].backgroundColor = style.getPropertyValue('--lose');

    if (this.performanceChartOptions?.scales && this.performanceChartOptions.scales['x'])
      this.performanceChartOptions.scales['x'].grid = { color: style.getPropertyValue('--white-shade') };
    if (this.performanceChartOptions?.scales && this.performanceChartOptions.scales['y'])
      this.performanceChartOptions.scales['y'].grid = { color: style.getPropertyValue('--white-shade') };

    if (this.avgGoalsChartOptions?.scales && this.avgGoalsChartOptions.scales['x'])
      this.avgGoalsChartOptions.scales['x'].grid = { color: style.getPropertyValue('--white-shade') };
    if (this.avgGoalsChartOptions?.scales && this.avgGoalsChartOptions.scales['y'])
      this.avgGoalsChartOptions.scales['y'].grid = { color: style.getPropertyValue('--white-shade') };

    this.charts?.forEach((chart) => {
      chart.render();
    });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) this.languageSubscription.unsubscribe();
    if (this.themeSubscription) this.themeSubscription.unsubscribe();
    removeEventListener("resize", this.eventOnResize);
  }
}

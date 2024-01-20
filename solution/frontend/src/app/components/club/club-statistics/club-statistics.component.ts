import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { AvgGoalsStatisticsDto, WinDrawLoseStatisticsDto } from '../../../models/club.dto.model';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import moment from 'moment';
import { UtilsService } from '../../../services/utils.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-club-statistics',
  standalone: true,
  imports: [NgChartsModule, ReactiveFormsModule],
  templateUrl: './club-statistics.component.html',
  styleUrl: './club-statistics.component.css',
})
export class ClubStatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  avgGoalsYear = new FormControl <number | null>(null);
  avgGoalsYears: number[];

  performancePerYear = new FormControl <number | null>(null);
  performancePerYears: number[];

  data1: WinDrawLoseStatisticsDto[] = [
    { year: 2021, wins: 20, draws: 10, loses: 5 },
    { year: 2022, wins: 25, draws: 8, loses: 7 },
    { year: 2023, wins: 18, draws: 12, loses: 6 },
    { year: 2024, wins: 22, draws: 15, loses: 3 },
    { year: 2025, wins: 30, draws: 5, loses: 5 },
    { year: 2026, wins: 28, draws: 7, loses: 5 },
    { year: 2027, wins: 23, draws: 10, loses: 7 },
    { year: 2028, wins: 26, draws: 9, loses: 5 },
    { year: 2029, wins: 21, draws: 11, loses: 8 },
    { year: 2030, wins: 24, draws: 10, loses: 6 },
  ];

  data2: AvgGoalsStatisticsDto[] = [
    {year: 2012, competition:	"bundesliga", avgGoals:	1.9117647058823529 },
    {year: 2012, competition:	"dfb-pokal", avgGoals:	2.6666666666666667 },
    {year: 2012, competition:	"europa-league", avgGoals:	1.2500000000000000 },
    {year: 2013, competition:	"bundesliga", avgGoals:	1.7647058823529412 },
    {year: 2013, competition:	"dfb-pokal", avgGoals:	2.5000000000000000 },
    {year: 2013, competition:	"uefa-champions-league", avgGoals:	1.2500000000000000 },
    {year: 2014, competition:	"bundesliga", avgGoals:	1.8235294117647059 },
    {year: 2014, competition:	"dfb-pokal", avgGoals:	4.5000000000000000 },
    {year: 2014, competition:	"uefa-champions-league", avgGoals:	1.2500000000000000 },
    {year: 2014, competition:	"uefa-champions-league-qualifikation", avgGoals:	3.5000000000000000 },
    {year: 2015, competition:	"bundesliga", avgGoals:	1.6470588235294118 },
    {year: 2015, competition:	"dfb-pokal", avgGoals:	3.2500000000000000 },
    {year: 2015, competition:	"europa-league", avgGoals:	1.00000000000000000000 },
    {year: 2015, competition:	"uefa-champions-league", avgGoals:	2.1666666666666667 },
    {year: 2015, competition:	"uefa-champions-league-qualifikation", avgGoals:	1.5000000000000000 },
    {year: 2016, competition:	"bundesliga", avgGoals:	1.5588235294117647 },
    {year: 2016, competition:	"dfb-pokal", avgGoals:	3.5000000000000000 },
    {year: 2016, competition:	"uefa-champions-league", avgGoals:	1.2500000000000000 },
    {year: 2017, competition:	"bundesliga", avgGoals:	1.7058823529411765 },
    {year: 2017, competition:	"dfb-pokal", avgGoals:	2.8000000000000000 },
    {year: 2018, competition:	"bundesliga", avgGoals:	2.0294117647058824 },
    {year: 2018, competition:	"dfb-pokal", avgGoals:	2.3333333333333333 },
    {year: 2018, competition:	"europa-league", avgGoals:	2.1250000000000000 },
    {year: 2019, competition:	"bundesliga", avgGoals:	1.7941176470588235 },
    {year: 2019, competition:	"dfb-pokal", avgGoals:	2.5000000000000000 },
    {year: 2019, competition:	"europa-league", avgGoals:	2.0000000000000000 },
    {year: 2019, competition:	"uefa-champions-league", avgGoals:	0.83333333333333333333 },
    {year: 2020, competition:	"bundesliga", avgGoals:	1.5588235294117647 },
    {year: 2020, competition:	"dfb-pokal", avgGoals:	4.0000000000000000 },
    {year: 2020, competition:	"europa-league", avgGoals:	3.0000000000000000 },
    {year: 2021, competition:	"bundesliga", avgGoals:	2.3529411764705882 },
    {year: 2021, competition:	"dfb-pokal", avgGoals:	2.0000000000000000 },
    {year: 2021, competition:	"europa-league", avgGoals:	2.0000000000000000 },
    {year: 2022, competition:	"bundesliga", avgGoals:	1.6764705882352941 },
    {year: 2022, competition:	"dfb-pokal", avgGoals:	3.0000000000000000 },
    {year: 2022, competition:	"europa-league", avgGoals:	2.3750000000000000 },
    {year: 2022, competition:	"uefa-champions-league", avgGoals:	0.66666666666666666667 },
    {year: 2023, competition:	"bundesliga", avgGoals:	3.0833333333333333 },
    {year: 2023, competition:	"dfb-pokal", avgGoals:	6.5000000000000000 },
    {year: 2023, competition:	"europa-league", avgGoals:	2.8000000000000000 }
  ]

  public barChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true, plugins: {legend: {position: 'bottom'}} };

  public lineChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'bar'> = { responsive: true, plugins: {legend: {position: 'bottom'}} };

  private eventOnResize = this.onWindowResize.bind(this);
  private languageSubscription: Subscription;

  constructor(
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
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
    this.data1.forEach(x => {
      labels.add(x.year);
      wins.push(x.wins);
      draws.push(x.draws);
      loses.push(x.loses);
    });
    this.barChartData.labels = [...labels].filter(x => x >= (this.performancePerYear.value || 0));
    this.barChartData.datasets = [
      { data: wins, label: this.languageService.selectedLanguage['club_statistics_wins'] },
      { data: draws, label: this.languageService.selectedLanguage['club_statistics_draws'] },
      { data: loses, label: this.languageService.selectedLanguage['club_statistics_loses'] },
    ];

    labels = new Set<number>();
    let grouped: {[key: string]: { [key: string]: number } } = {};
    this.data2.forEach(x => {
      labels.add(x.year);
      (grouped[x.competition] = grouped[x.competition] || {});
      grouped[x.competition][x.year] = x.avgGoals;
    });
    let groupedData: { [key: string]: number[] } = {};
    for (let [key, value] of Object.entries(grouped)){
      groupedData[key] = groupedData[key] || [];
      for (let year of labels)
        groupedData[key].push(value[year]);
    }

    this.lineChartData.labels = [...labels].filter(x => x >= (this.avgGoalsYear.value || 0));
    this.lineChartData.datasets = [];
    for (let [key, value] of Object.entries(groupedData))
      this.lineChartData.datasets.push({ data: value, label: key });

    this.renderCharts();
  }

  onWindowResize() {
    this.renderCharts();
  }

  renderCharts() {
    this.charts?.forEach((chart) => {
      chart.render();
    });
  }

  ngAfterViewInit(): void {
    // let style = getComputedStyle(document.querySelector('[class$="-theme"]')!);
    // this.barChartData.datasets[0].backgroundColor = style.getPropertyValue('--win');
    // this.barChartData.datasets[1].backgroundColor = style.getPropertyValue('--draw');
    // this.barChartData.datasets[2].backgroundColor = style.getPropertyValue('--lose');
    // this.lineChartData.datasets[0].backgroundColor = style.getPropertyValue('--lose');
    // console.log(this.charts)
    // this.charts.forEach((chart) => {
    //   chart.render();
    // });
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) this.languageSubscription.unsubscribe();
    removeEventListener("resize", this.eventOnResize);
  }
}

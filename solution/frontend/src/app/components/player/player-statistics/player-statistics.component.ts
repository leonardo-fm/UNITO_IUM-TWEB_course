import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { GoalCardsStatisticsDto, MarketValueStatisticsDto } from '../../../models/player.dto.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-statistics',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './player-statistics.component.html',
  styleUrl: './player-statistics.component.css'
})
export class PlayerStatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  data1: GoalCardsStatisticsDto[] = [
    { year: 2021, goals: 5, assists: 2, yellowCards: 1, redCards: 0 },
    { year: 2022, goals: 8, assists: 3, yellowCards: 2, redCards: 1 },
    { year: 2023, goals: 6, assists: 1, yellowCards: 0, redCards: 1 },
    { year: 2024, goals: 7, assists: 4, yellowCards: 1, redCards: 0 }
  ];

  data2: MarketValueStatisticsDto[] = [
    { date: new Date("2018-12-30T00:00:00.000Z"), "market_value_in_eur": 200000 },
    { date: new Date("2019-04-30T00:00:00.000Z"), "market_value_in_eur": 3000000 },
    { date: new Date("2019-06-25T00:00:00.000Z"), "market_value_in_eur": 3500000 },
    { date: new Date("2019-09-25T00:00:00.000Z"), "market_value_in_eur": 4000000 },
    { date: new Date("2019-12-07T00:00:00.000Z"), "market_value_in_eur": 7500000 },
    { date: new Date("2020-04-08T00:00:00.000Z"), "market_value_in_eur": 6700000 },
    { date: new Date("2020-07-10T00:00:00.000Z"), "market_value_in_eur": 9000000 },
    { date: new Date("2020-12-27T00:00:00.000Z"), "market_value_in_eur": 12000000 },
    { date: new Date("2021-05-28T00:00:00.000Z"), "market_value_in_eur": 17000000 },
    { date: new Date("2021-12-26T00:00:00.000Z"), "market_value_in_eur": 19000000 },
    { date: new Date("2022-06-22T00:00:00.000Z"), "market_value_in_eur": 20000000 },
    { date: new Date("2022-09-21T00:00:00.000Z"), "market_value_in_eur": 15000000 },
    { date: new Date("2022-11-09T00:00:00.000Z"), "market_value_in_eur": 15000000 },
    { date: new Date("2023-06-22T00:00:00.000Z"), "market_value_in_eur": 18000000 }
  ]

  private eventOnResize = this.onWindowResize.bind(this);
  private languageSubscription: Subscription;

  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = { responsive: true };

  constructor(
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    addEventListener("resize", this.eventOnResize);
    this.languageSubscription = this.languageService.languageSubject.subscribe(() => this.updateData());
    this.updateData();
  }

  onWindowResize() {
    this.renderCharts();
  }

  updateData() {
    var labels = new Set<string>();
    var goals: number[] = [], assists: number[] = [], yellowCards: number[] = [], redCards: number[] = [];
    this.data1.forEach(x => {
      labels.add(moment().year(x.year).format('YYYY'));
      goals.push(x.goals);
      assists.push(x.assists);
      yellowCards.push(x.yellowCards);
      redCards.push(x.redCards);
    });
    this.barChartData.labels = [...labels];
    this.barChartData.datasets = [
      { data: goals, label: this.languageService.selectedLanguage['player_statistics_goals'] },
      { data: assists, label: this.languageService.selectedLanguage['player_statistics_assists'] },
      { data: yellowCards, label: this.languageService.selectedLanguage['player_statistics_yellow_cards'] },
      { data: redCards, label: this.languageService.selectedLanguage['player_statistics_red_cards'] },
    ];

    labels = new Set<string>();
    var marketValues: number [] = [];
    this.data2.forEach(x => {
      labels.add(moment(x.date).format('MMMM YYYY'));
      marketValues.push(x.market_value_in_eur);
    });
    this.lineChartData.labels = [...labels];
    this.lineChartData.datasets = [
      { data: marketValues, label: this.languageService.selectedLanguage['player_statistics_market_value'] },
    ]

    this.renderCharts();
  }

  renderCharts() {
    this.charts?.forEach((chart) => {
      chart.render();
    });
  }

  ngAfterViewInit(): void {
    // let style = getComputedStyle(document.querySelector('[class$="-theme"]')!);
    // this.barChartData.datasets[0].backgroundColor = 'green';
    // this.barChartData.datasets[1].backgroundColor = 'yellow';
    // this.barChartData.datasets[2].backgroundColor = 'red';

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

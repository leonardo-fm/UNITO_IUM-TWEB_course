import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { GoalCardsStatisticsDto, MarketValueStatisticsDto } from '../../../models/player.dto.model';
import moment from 'moment';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { PlayerService } from '../../../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-statistics',
  standalone: true,
  imports: [NgChartsModule, ReactiveFormsModule],
  templateUrl: './player-statistics.component.html',
  styleUrl: './player-statistics.component.css'
})
export class PlayerStatisticsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
  moment = moment;

  data1: GoalCardsStatisticsDto[] = [];
  data2: MarketValueStatisticsDto[] = [];

  highlightsYear = new FormControl <number | null>(null);
  highlightsYears: number[];

  marketValueDate = new FormControl <Date | null>(null);
  marketValueDates: Date[];

  private eventOnResize = this.onWindowResize.bind(this);
  private languageSubscription: Subscription;

  public barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true, plugins: {legend: {position: 'bottom'}} };

  public lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  public lineChartOptions: ChartOptions<'line'> = { 
    responsive: true, 
    plugins: { legend: { position: 'bottom'} }, 
    scales: { y: {beginAtZero: true} }
  };

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private playerService: PlayerService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let playerId = params['id'];
      this.loaderService.show();
      Promise.all([this.playerService.getPlayerHighlights(playerId), this.playerService.getPlayerMarketValue(playerId)])
        .then(datas => {
          this.data1 = datas[0];
          this.highlightsYears = [...new Set(this.data1.map(x => x.year))];
          this.highlightsYear.patchValue(this.highlightsYears[Math.max(this.highlightsYears.length - 4, 0)]);
          
          this.data2 = datas[1];
          this.marketValueDates = [...new Set(this.data2.map(x => x.date))];
          this.marketValueDate.patchValue(this.marketValueDates[Math.max(this.marketValueDates.length - 10, 0)]);
        })
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
        
      this.highlightsYear.valueChanges.subscribe(() => this.updateData());
      this.marketValueDate.valueChanges.subscribe(() => this.updateData());
    });

    addEventListener("resize", this.eventOnResize);
    this.languageSubscription = this.languageService.languageSubject.subscribe(() => this.updateData());
  }

  onWindowResize() {
    this.renderCharts();
  }

  updateData() {
    var labels = new Set<number>();
    var goals: number[] = [], assists: number[] = [], yellowCards: number[] = [], redCards: number[] = [];
    this.data1.filter(x => x.year >= (this.highlightsYear.value || 0))
      .forEach(x => {
        labels.add(x.year);
        goals.push(x.totalGoals);
        assists.push(x.totalAssists);
        yellowCards.push(x.totalYellowCards);
        redCards.push(x.totalRedCards);
      });
    this.barChartData.labels = [...labels].filter(x => x >= (this.highlightsYear.value || 0));
    this.barChartData.datasets = [
      { data: goals, label: this.languageService.selectedLanguage['player_statistics_goals'] },
      { data: assists, label: this.languageService.selectedLanguage['player_statistics_assists'] },
      { data: yellowCards, label: this.languageService.selectedLanguage['player_statistics_yellow_cards'] },
      { data: redCards, label: this.languageService.selectedLanguage['player_statistics_red_cards'] },
    ];

    var marketLabels = new Set<string>();
    var marketValues: number [] = [];
    this.data2.filter(x => x.date >= (this.marketValueDate.value || 0))
      .forEach(x => {
        marketLabels.add(moment(x.date).format('MMMM YYYY'));
        marketValues.push(x.market_value_in_eur);
      });
    this.lineChartData.labels = [...marketLabels];
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

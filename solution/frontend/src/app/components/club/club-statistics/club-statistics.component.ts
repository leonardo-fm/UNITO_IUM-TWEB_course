import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-club-statistics',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './club-statistics.component.html',
  styleUrl: './club-statistics.component.css'
})
export class ClubStatisticsComponent implements OnInit, AfterViewInit {
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'W' },
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'D' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'L' }
    ]
  };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Europa league', cubicInterpolationMode: 'monotone' },
      { data: [62, 59, 77, 81, 56, 55, 40], label: 'Bundesliga', cubicInterpolationMode: 'monotone' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Dfb pokal', cubicInterpolationMode: 'monotone' },
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  constructor() { }

  ngOnInit(): void {
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

}

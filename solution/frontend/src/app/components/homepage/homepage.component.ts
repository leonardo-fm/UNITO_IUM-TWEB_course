import { Component } from '@angular/core';
import { CountryLeaguesComponent } from './country-leagues/country-leagues.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CountryLeaguesComponent],
  host: { class: 'container d-flex flex-row h-100 w-100 overflow-auto py-4' },
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
}

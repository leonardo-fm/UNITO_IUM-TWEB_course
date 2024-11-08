import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { LoaderService } from '../../services/loader.service';
import { LanguageService } from '../../services/language.service';
import { ClubPlayersComponent } from './club-players/club-players.component';
import { ClubGamesComponent } from './club-games/club-games.component';
import { ClubDto } from '../../models/club.dto.model';
import { ChatRoomType } from '../../models/chat.dto.model';
import { ScrollDirective } from '../../directives/scroll.directive';
import { SvgDirective } from '../../directives/svg.directive';
import { ClubStatisticsComponent } from './club-statistics/club-statistics.component';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [ClubPlayersComponent, ClubGamesComponent, ClubStatisticsComponent, RouterLink, ScrollDirective, SvgDirective],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit {

  club: ClubDto;
  ChatRoomType = ChatRoomType;

  constructor(
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private router: Router,
    private clubService: ClubService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let clubId = params['id'];
      this.loaderService.show();
      this.clubService.getClubById(clubId)
        .then(club => {this.club = club; console.log(this.club)})
        .catch(() => this.router.navigate(['/error']))
        .finally(() => this.loaderService.hide());
    });
  }

  onScrollBottom(){
    this.clubService.gameHistoryScroll.next(null);
  }
}

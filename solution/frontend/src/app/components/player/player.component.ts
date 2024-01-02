import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { LoaderService } from '../../services/loader.service';
import { LanguageService } from '../../services/language.service';
import moment from 'moment';
import { PlayerGamesComponent } from './player-games/player-games.component';
import { PlayerDetailDto } from '../../models/player.dto.model';
import { ChatRoomType } from '../../models/chat.dto.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [PlayerGamesComponent, RouterLink],
  host: { class: 'container d-flex flex-column h-100 w-100 overflow-auto gap-3 py-4' },
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit {
  player: PlayerDetailDto;
  moment = moment;
  ChatRoomType = ChatRoomType;

  constructor(
    public languageService: LanguageService,
    private playerService: PlayerService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let playerId = params['id'];
      this.loaderService.show();
      this.playerService.getPlayerById(playerId).then(player => {
        this.player = player;
        console.log(player);
      }).finally(() => this.loaderService.hide());
    });
  }

  // https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
  nFormatter(num: number, digits: number = 2) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
}

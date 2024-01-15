import { Component, OnInit } from '@angular/core';
import { ChatRoomType } from '../../models/chat.dto.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClubDto } from '../../models/club.dto.model';
import { CompetitionDto } from '../../models/competition.dto.model';
import { PlayerDto } from '../../models/player.dto.model';
import { CompetitionService } from '../../services/competition.service';
import { LoaderService } from '../../services/loader.service';
import { ClubService } from '../../services/club.service';
import { PlayerService } from '../../services/player.service';
import { LanguageService } from '../../services/language.service';
import { MessagingComponent } from './messaging/messaging.component';
import { GameService } from '../../services/game.service';
import { GameDto } from '../../models/game.dto.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [MessagingComponent, RouterLink],
  host: { class: 'container d-flex flex-column h-100 w-100 gap-3 py-4' },
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit {

  roomId: string;
  roomType: ChatRoomType;
  ChatRoomType = ChatRoomType;

  competition: CompetitionDto;
  club: ClubDto;
  player: PlayerDto;
  game: GameDto;

  constructor(
    public languageService: LanguageService,
    private competitionService: CompetitionService,
    private clubService: ClubService,
    private playerService: PlayerService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomType = params['room'];
      this.roomId = params['id'];
      console.log(this.roomType, this.roomId);
      console.log(this.roomType === ChatRoomType.Competition);

      this.loaderService.show();
      switch (this.roomType) {
        case ChatRoomType.Competition:
          this.competitionService.getCompetitionById(this.roomId)
            .then(res => this.competition = res)
            .catch(() => this.router.navigate(['/error']))
            .finally(() => this.loaderService.hide());
          break;
        case ChatRoomType.Club:
          this.clubService.getClubById(Number(this.roomId))
            .then(res => this.club = res)
            .catch(() => this.router.navigate(['/error']))
            .finally(() => this.loaderService.hide());
          break;
        case ChatRoomType.Player:
          this.playerService.getPlayerById(Number(this.roomId))
            .then(res => this.player = res)
            .catch(() => this.router.navigate(['/error']))
            .finally(() => this.loaderService.hide());
          break;
        case ChatRoomType.Game:
          this.gameService.getGameById(Number(this.roomId))
            .then(res => this.game = res)
            .catch(() => this.router.navigate(['/error']))
            .finally(() => this.loaderService.hide());
          break;
        default:
          this.loaderService.hide();
      }
    });
  }
}

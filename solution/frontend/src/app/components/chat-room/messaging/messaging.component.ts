import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatRoomType, MessageDto } from '../../../models/chat.dto.model';
import moment from 'moment';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { SvgDirective } from '../../../directives/svg.directive';
import { ScrollDirective } from '../../../directives/scroll.directive';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [FormsModule, SvgDirective, ScrollDirective],
  host: { class: 'd-flex flex-column h-100 w-100 gap-3' },
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent implements OnInit, OnDestroy {
  @ViewChild('scrollElement') scrollElement: ElementRef;

  roomId: string;
  roomType: ChatRoomType;
  roomSize: number;

  chat: MessageDto[] = [];
  message: string;
  accountId: string;
  accontName: string;

  messageSubscription: Subscription;
  roomSizeSubscription: Subscription;
  loggedUserSubscription: Subscription;

  moment = moment;

  constructor(
    private chatService: ChatService,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loggedUserSubscription = this.authenticationService.loggedUserSubject.subscribe(user => {
      this.activatedRoute.params.subscribe(params => {
        this.roomType = params['room'];
        this.roomId = params['id'];

        this.accountId = user?.id ?? moment().unix().toString();
        this.accontName = user?.username ?? 'Guest_' + this.accountId;
        this.loaderService.show();
        this.chatService.getMessages(this.roomType, this.roomId).then(messages => {
          this.chat = messages;
          this.scrollBottom();
        }).finally(() => this.loaderService.hide())
        this.chatService.connectChat(this.roomType, this.roomId);
      });
    });

    this.roomSizeSubscription = this.chatService.roomSizeSubject.subscribe(size => this.roomSize = size);
    this.messageSubscription = this.chatService.messageSubject.subscribe(message => {
      this.chat.push(message);
    })
  }

  scrollBottom() {
    let el: HTMLElement = this.scrollElement.nativeElement;
    // Need to wait html update of angular 
    setTimeout(() => {
      el.scrollTo(0, el.scrollHeight);
    }, 10);
  }

  onMessageSend() {
    if (!this.message)
      return;
    let message: MessageDto = {
      accountId: this.accountId,
      accountName: this.accontName,
      message: this.message,
      date: new Date()
    };

    this.chatService.messageSubject.next(message);
    this.scrollBottom();
    this.chatService.sendMessage(this.roomType, this.roomId, message);

    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
    if (this.roomSizeSubscription) this.roomSizeSubscription.unsubscribe();
    if (this.loggedUserSubscription) this.loggedUserSubscription.unsubscribe();
    this.chatService.disconnectChat();
  }

  formatDate(date: Date) {
    return moment().isSame(date, 'date') ? moment(date).format('LT') : moment(date).format('L')
  }
}

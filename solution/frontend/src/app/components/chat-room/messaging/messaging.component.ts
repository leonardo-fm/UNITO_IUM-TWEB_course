import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatRoomType, MessageDto } from '../../../models/chat.dto.model';
import moment from 'moment';
import { ChatService } from '../../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [FormsModule],
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

  moment = moment;

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomType = params['room'];
      this.roomId = params['id'];

      this.accountId = moment().unix().toString();
      this.accontName = 'Guest_' + this.accountId;
      this.chatService.getMessages(this.roomType, this.roomId).then(messages => {
        this.chat = messages;
      })
      this.chatService.connectChat(this.roomType, this.roomId);
    });

    this.roomSizeSubscription = this.chatService.roomSizeSubject.subscribe(size => this.roomSize = size);
    this.messageSubscription = this.chatService.messageSubject.subscribe(message => {
      this.chat.push(message);
    })
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
    this.chatService.sendMessage(this.roomType, this.roomId, message);

    this.message = '';
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
    this.chatService.disconnectChat();
  }

  formatDate(date: Date) {
    return moment().isSame(date, 'date') ? moment(date).format('LT') : moment(date).format('L')
  }
}

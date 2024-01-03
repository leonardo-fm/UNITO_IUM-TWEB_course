import { Component, OnDestroy, OnInit } from '@angular/core';
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

  roomId: string;
  roomType: ChatRoomType;

  chat: MessageDto[] = [];
  message: string;
  accountId: string;
  accontName: string;

  messageSubscription: Subscription;

  moment = moment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomType = params['room'];
      this.roomId = params['id'];

      this.accountId = moment().unix().toString();
      this.accontName = 'Guest_' + this.accountId;
      this.chatService.connectChat(this.roomType, this.roomId);
    });

    this.messageSubscription = this.chatService.messageSubject.subscribe(message => {
      this.chat.push(message);
    })
  }

  onMessageSend() {
    let message: MessageDto = {
      accountId: this.accountId,
      accountName: this.accontName,
      message: this.message,
      date: new Date()
    };

    this.chat.push(message);
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

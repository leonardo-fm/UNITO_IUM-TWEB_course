import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageDto } from '../../../models/chat.dto.model';
import moment from 'moment';

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [FormsModule],
  host: { class: 'd-flex flex-column h-100 w-100 gap-3' },
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.css'
})
export class MessagingComponent implements OnInit {

  chat: MessageDto[] = [];
  message: string;
  accountId: string;
  accontName: string;

  moment = moment;

  constructor() { }

  ngOnInit(): void {
    this.accountId = moment().unix().toString();
    this.accontName = 'Guest_'+this.accountId;
  }

  onMessageSend() {
    this.chat.push({
      accountId: this.accountId,
      accountName: this.accontName,
      message: this.message,
      date: new Date()
    });
    this.message = '';
  }

  formatDate(date: Date) {
    return moment().isSame(date, 'date') ? moment(date).format('LT') : moment(date).format('L')
  }
}

import { Component, OnInit } from '@angular/core';
import { ChatRoomType } from '../../models/chat.dto.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [],
  host: { class: 'container d-flex flex-column h-100 w-100 gap-3 py-4' },
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit {
  public roomType: ChatRoomType;
  public roomId: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.roomType = params['room'];
      this.roomId = params['id'];
      console.log(this.roomType, this.roomId);
    });
  }
}

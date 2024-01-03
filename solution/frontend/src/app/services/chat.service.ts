import { Injectable, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { ChatDto, ChatRoomType, MessageDto } from '../models/chat.dto.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public messageSubject = new Subject<MessageDto>();
  public roomSizeSubject = new Subject<number>();

  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, { autoConnect: false });

    this.socket.on('message', (message: MessageDto) => {
      console.log('Received Message', message);
      this.messageSubject.next(message);
    });

    this.socket.on('room size', (roomSize: number) => {
      this.roomSizeSubject.next(roomSize);
    });
  }

  getMessages(roomType: ChatRoomType, roomId: string, offset: number = 0, take: number = 25) {
    return axios.get<MessageDto[]>(environment.apiUrl + '/getChatMessages', {
      params: { 
        chatId: roomType + roomId,
        offset: offset,
        take: take
      } 
    }).then(res => {
      return res.data;
    });
  }

  sendMessage(roomType: ChatRoomType, roomId: string, message: MessageDto) {
    this.socket.emit('message', roomType + roomId, message);
  }

  connectChat(roomType: ChatRoomType, roomId: string) {
    this.socket.connect()
    this.socket.emit('join room', roomType + roomId);
  }

  disconnectChat() {
    this.socket.disconnect();
  }
}

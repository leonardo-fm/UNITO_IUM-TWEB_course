export class ChatDto {
    roomId: string;
    roomType: ChatRoomType;
    messages: MessageDto[];
}

export class MessageDto {
    accountId: string;
    accountName: string | undefined;
    date: Date;
    message: string;
}

export enum ChatRoomType {
    Competition = 'competition',
    Player = 'player',
    Club = 'club',
    Game = 'game',
}
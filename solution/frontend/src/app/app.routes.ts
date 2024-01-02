import { Routes } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { GameComponent } from './components/game/game.component';
import { ClubComponent } from './components/club/club.component';
import { PlayerComponent } from './components/player/player.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

export const routes: Routes = [
    {path: '', component: MainpageComponent, children: [
        {path: '', component: HomepageComponent, pathMatch: 'full'},
        {path: 'competition/:id', component: CompetitionComponent},
        {path: 'game/:id', component: GameComponent},
        {path: 'club/:id', component: ClubComponent},
        {path: 'player/:id', component: PlayerComponent},
        {path: 'chat/:room/:id', component: ChatRoomComponent},
    ]}
];

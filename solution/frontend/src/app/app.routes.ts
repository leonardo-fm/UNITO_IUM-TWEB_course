import { Routes } from '@angular/router';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    {path: '', component: MainpageComponent, children: [
        {path: '', component: HomepageComponent, pathMatch: 'full'}
    ]}
];

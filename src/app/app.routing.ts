import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LandingPageComponent } from './components/landingPage/landingPage.component';
import { PrivateZoneComponent } from './components/privateZone/privateZone.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

const ApplicationRoutes: Routes = [
  { path: '', redirectTo:'public',pathMatch:'full' },
  { path: 'public', component: LandingPageComponent },
  { path: 'private', component: PrivateZoneComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot( ApplicationRoutes )],
  exports: [RouterModule]
})
export class AppRoutingModule {}

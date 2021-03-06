import{ BrowserModule } from '@angular/platform-browser';
import{ NgModule } from '@angular/core';
import{ AppRoutingModule } from './app.routing';
import{ SessionHandlerModule } from './lib/sessionHandler.module';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landingPage/landingPage.component';
import { PrivateZoneComponent } from './components/privateZone/privateZone.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SessionHandlerModule
  ],
  
  declarations: [
    AppComponent,
    LandingPageComponent,
    PrivateZoneComponent,
    PageNotFoundComponent
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

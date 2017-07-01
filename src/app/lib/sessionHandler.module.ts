import{ NgModule } from '@angular/core';

import{ SessionHandlerService } from './sessionHandler.service';
import{ SessionHandlerDirective } from './sessionHandler.directive';


@NgModule({
  imports:[],
  declarations:[ SessionHandlerDirective ],
  exports:[ SessionHandlerDirective ],
  providers:[ SessionHandlerModule ]
})//module

export class SessionHandlerModule {
}//SessionHandlerModule
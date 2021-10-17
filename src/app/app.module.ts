import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store';

import * as fromApp from "./store/app.reducer"

import { AppComponent } from "./app.component";
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

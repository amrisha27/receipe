import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from "./app.component";


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

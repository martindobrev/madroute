import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';

import { MadRouteService } from './mad-route.service';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { AboutComponent } from './about/about.component';
import { RouteListComponent } from './route-list/route-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RouteDetailComponent,
    YoutubePlayerComponent,
    AboutComponent,
    RouteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MadRouteService],
  bootstrap: [AppComponent]
})
export class AppModule { }

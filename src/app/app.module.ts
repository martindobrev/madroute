import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';

import { MadRouteService } from './mad-route.service';
import { MadRouteNavigationService } from './mad-route-navigation.service';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { AboutComponent } from './about/about.component';
import { RouteListComponent } from './route-list/route-list.component';
import { MadRouteResolver } from './resolvers/mad-route.resolver.service';
import { CreateRouteComponent } from './create-route/create-route.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RouteDetailComponent,
    YoutubePlayerComponent,
    AboutComponent,
    RouteListComponent,
    CreateRouteComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MadRouteService, MadRouteNavigationService, MadRouteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

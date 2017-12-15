import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouteListComponent } from './route-list/route-list.component';
import { MadRouteResolver } from './resolvers/mad-route.resolver.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'routes', component: RouteListComponent },
  {
    path: 'route/:id',
    component: RouteDetailComponent,
    resolve: {
      madRoute: MadRouteResolver
    }
  },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MadRouteResolver
  ]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.component';
import {ActivitiesComponent} from './activities/activities.component';
import {ActivityeditComponent} from './activities/activityedit/activityedit.component';
import {LocationsComponent} from './locations/locations.component';
import {LocationeditComponent} from './locations/locationedit/locationedit.component';
import {InstitutionsComponent} from './institutions/institutions.component';
import {InstitutioneditComponent} from './institutions/institutionedit/institutionedit.component';
import { OffersComponent } from './offers/offers.component';
import { OffereditComponent } from './offers/offeredit/offeredit.component';
import { CidadeComponent } from './cidade/cidade.component';
import { CidadeEditComponent } from './cidade/cidade-edit/cidade-edit.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'institutions', component: InstitutionsComponent },
      { path: 'institutionEdit/:id', component: InstitutioneditComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'activityEdit/:id', component: ActivityeditComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'locationEdit/:id', component: LocationeditComponent },
      { path: 'offers', component: OffersComponent },
      { path: 'offersEdit/:id', component: OffereditComponent },
      { path: 'cidades', component: CidadeComponent },
      { path: 'cidadesEdit/:id', component: CidadeEditComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

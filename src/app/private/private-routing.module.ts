import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrivateComponent } from './private.component';
import { PhonetypeComponent } from './phonetype/phonetype.component';
import { PhonetypeeditComponent } from './phonetype/phonetypeedit/phonetypeedit.component';
import { EmailtypeComponent } from './emailtype/emailtype.component';
import { EmailtypeeditComponent } from './emailtype/emailtypeedit/emailtypeedit.component';
import {ActivitiesComponent} from './activities/activities.component';
import {ActivityeditComponent} from './activities/activityedit/activityedit.component';
import {LocationsComponent} from './locations/locations.component';
import {LocationeditComponent} from './locations/locationedit/locationedit.component';
import {InstitutionsComponent} from './institutions/institutions.component';
import {InstitutioneditComponent} from './institutions/institutionedit/institutionedit.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'phonetype', component: PhonetypeComponent },
      { path: 'phonetypeEdit/:id', component: PhonetypeeditComponent },
      { path: 'emailtype', component: EmailtypeComponent },
      { path: 'emailtypeEdit/:id', component: EmailtypeeditComponent },
      { path: 'institutions', component: InstitutionsComponent },
      { path: 'institutionEdit/:id', component: InstitutioneditComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'activityEdit/:id', component: ActivityeditComponent },
      { path: 'locations', component: LocationsComponent },
      { path: 'locationEdit/:id', component: LocationeditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../security/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { OffersComponent } from './offers/offers.component';
import { LocationsComponent } from './locations/locations.component';
import { ActivitiesComponent } from './activities/activities.component';
import { InstitutioneditComponent } from './institutions/institutionedit/institutionedit.component';
import { OffereditComponent } from './offers/offeredit/offeredit.component';
import { LocationeditComponent } from './locations/locationedit/locationedit.component';
import { ActivityeditComponent } from './activities/activityedit/activityedit.component';
import { CidadeComponent } from './cidade/cidade.component';
import { CidadeEditComponent } from './cidade/cidade-edit/cidade-edit.component';
import { ApiServiceService } from '../shared/api-service.service';

import { BasicoComponent } from '../shared/formulario/basico/basico.component';
import { InputComponent } from '../shared/formulario/input/input.component';



@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    InstitutionsComponent,
    OffersComponent,
    LocationsComponent,
    ActivitiesComponent,
    InstitutioneditComponent,
    OffereditComponent,
    LocationeditComponent,
    ActivityeditComponent,
    CidadeComponent,
    CidadeEditComponent,
    BasicoComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [UserService, ApiServiceService]
})

export class PrivateModule { }

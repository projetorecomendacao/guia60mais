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
import { PhonetypeComponent } from './phonetype/phonetype.component';
import { PhonetypeeditComponent } from './phonetype/phonetypeedit/phonetypeedit.component';
import { EmailtypeComponent } from './emailtype/emailtype.component';
import { EmailtypeeditComponent } from './emailtype/emailtypeedit/emailtypeedit.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { OffersComponent } from './offers/offers.component';
import { LocationsComponent } from './locations/locations.component';
import { ActivitiesComponent } from './activities/activities.component';
import { InstitutioneditComponent } from './institutions/institutionedit/institutionedit.component';
import { OffereditComponent } from './offers/offeredit/offeredit.component';
import { LocationeditComponent } from './locations/locationedit/locationedit.component';
import { ActivityeditComponent } from './activities/activityedit/activityedit.component';




@NgModule({
  declarations: [
    PrivateComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PhonetypeComponent,
    PhonetypeeditComponent,
    EmailtypeComponent,
    EmailtypeeditComponent,
    InstitutionsComponent,
    OffersComponent,
    LocationsComponent,
    ActivitiesComponent,
    InstitutioneditComponent,
    OffereditComponent,
    LocationeditComponent,
    ActivityeditComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [UserService]
})

export class PrivateModule { }

import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../shared/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {REST_URL} from '../../../shared/REST_API_URLs';
import {HttpClient} from '@angular/common/http';

interface Location {
  id?: number;
  name?: string;
  communication: {
    email?: string;
    telefone?: string;
    fax?: string;
  };
  parking?: string;
  address: {
    address?: string;
    number?: string;
    district?: string;
    cep?: string;
    city?: string;
    state?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  institution: { id?: number, company_name?: string};
  contact_people: { id: number, email: string }[];
  technical_manager: { id: number, email: string }[];
}

@Component({
  selector: 'app-locationedit',
  templateUrl: './locationedit.component.html'
})
export class LocationeditComponent implements OnInit {
  id: number;
  location: Location;
  endPoint = 'locations';
  fatherComponent = '/locations';

  searchResults: { id: number, company_name: string }[];

  constructor(private api: ApiServiceService, private http: HttpClient, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.location = {
      communication: {},
      address: {},
      institution: {},
      contact_people: [],
      technical_manager: []
    };
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id != -1 )
      this.api.getOne(this.endPoint, this.id).subscribe(data => this.location = data);
  }

  update() {
    this.api.update(this.endPoint, this.id, this.location).subscribe();
  }

  create() {
    this.api.create(this.endPoint, this.location).subscribe();
  }


  salvar() {
    console.log(this.location);
    if (this.id != -1) this.update();
    else this.create();

    this.router.navigate([this.fatherComponent]);
  }

  addExpert(email: string, isManager: boolean = false) {
    let aux: string;
    if (isManager) aux = 'technical_manager';
    else aux = 'contact_people';
    this.http.post(REST_URL + 'experts/get_or_create/', { email }).subscribe(data => this.location[aux].push(data));
  }

  removeExpert(id: number, isManager: boolean = false) {
    let aux: string;
    if (isManager) aux = 'technical_manager';
    else aux = 'contact_people';
    if (this.location.id) this.api.update('locations', this.location.id, this.location).subscribe(_ => this.location[aux].splice(this.location[aux].findIndex(value => value.id === id), 1));
  }

  searchInstitution(value: string) {
    this.http.get(REST_URL + 'institutions', { params: { search: value } }).subscribe((data: any) => this.searchResults = data);
    return;
  }

  selectInstitution(id: number, company_name: string) {
    this.location.institution = { id, company_name };
  }

  removeInstitution() {
    this.location.institution = {};
    return;
  }

}

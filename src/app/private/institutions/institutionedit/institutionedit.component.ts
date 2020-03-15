import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../shared/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {REST_URL} from '../../../shared/REST_API_URLs';
import {HttpClient} from '@angular/common/http';

interface Institution {
  id?: number;
  company_name?: string;
  fantasy_name?: string;
  cnpj?: string;
  goal?: string;
  aimed_people?: string;
  aimed_people_age?: string;
  capacity_free?: number;
  capacity_free_M?: number;
  capacity_free_F?: number;
  capacity_used?: number;
  capacity_used_M?: number;
  capacity_used_F?: number;
  communication: {
    email?: string;
    telefone?: string;
    fax?: string;
  };
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
  contact_people: { id: number, email: string }[];
  technical_manager: { id: number, email: string }[];
  legal_nature?: string;
  note?: string;
}

@Component({
  selector: 'app-institutionedit',
  templateUrl: './institutionedit.component.html'
})
export class InstitutioneditComponent implements OnInit {
  id: number;
  institution: Institution;
  endPoint = 'institutions';
  fatherComponent = '/institutions';

  constructor(private api: ApiServiceService, private http: HttpClient, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.institution = {
      communication: {},
      address: {},
      contact_people: [],
      technical_manager: []
    };
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id != -1 )
      this.api.getOne(this.endPoint, this.id).subscribe(data => {
        console.log(data);
        this.institution = data;
      });
  }

  update() {
    this.api.update(this.endPoint, this.id, this.institution).subscribe();
  }

  create() {
    this.api.create(this.endPoint, this.institution).subscribe();
  }


  salvar() {
    console.log(this.institution);
    if (this.id != -1) this.update();
    else this.create();

    this.router.navigate([this.fatherComponent]);
  }

  addExpert(email: string, isManager: boolean = false) {
    let aux: string;
    if (isManager) aux = 'technical_manager';
    else aux = 'contact_people';
    this.http.post(REST_URL + 'experts/get_or_create/', { email }).subscribe(data => this.institution[aux].push(data));
  }

  removeExpert(id: number, isManager: boolean = false) {
    let aux: string;
    if (isManager) aux = 'technical_manager';
    else aux = 'contact_people';
    if (this.institution.id) this.api.update('institutions', this.institution.id, this.institution).subscribe(_ => this.institution[aux].splice(this.institution[aux].findIndex(value => value.id === id), 1));
  }
}

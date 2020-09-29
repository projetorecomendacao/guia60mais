import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { REST_URL } from '../../../shared/REST_API_URLs';
import { HttpClient } from '@angular/common/http';
import { Location } from '../locations.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-locationedit',
    templateUrl: './locationedit.component.html'
})
export class LocationeditComponent implements OnInit {

    id: number;
    location: Location;

    endPoint = 'locations';
    fatherComponent = '/locations';

    locationForm: FormGroup;

    //regex para validação
    numberPattern = /^[0-9]*$/;
    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    cepPattern = ""; //Definir Regex

    // searchResults: { id: number, company_name: string }[];

    constructor(
        private api: ApiServiceService,
        private http: HttpClient,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.createForm();

        this.id = this.activateRoute.snapshot.params.id;

        if (this.id != -1)
            this.api.getOne(this.endPoint, this.id).subscribe(data => this.location = data);
    }

    get contact_people() {
        return this.locationForm.get('contact_people') as FormArray;
    }

    get technical_manager() {
        return this.locationForm.get('technical_manager') as FormArray;
    }

    onSubmit() {

    }

    addContact() {
        this.contact_people.push(this.createPerson());
    }

    addManager() {
        this.technical_manager.push(this.createPerson());
    }

    removeContact(index:number) {
        this.contact_people.removeAt(index);
    }

    removeManager(index:number) {
        this.technical_manager.removeAt(index);
    }

    createPerson() {
        return this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
        })
    }

    createForm() {
        this.locationForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            communication: this.formBuilder.group({
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
                telefone: ['', [Validators.required]],
                fax: ['']
            }),
            parking: [''],
            address: this.formBuilder.group({
                address: ['', [Validators.required]],
                number: ['', [Validators.required]],
                district: ['', [Validators.required]],
                cep: ['', [Validators.required]], //cep pattern
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                country: ['', [Validators.required]],
                latitude: [''],
                longitude: ['']
            }),
            institution: this.formBuilder.group({
                company_name: ['',[Validators.required]]
            }),
            contact_people: this.formBuilder.array([this.createPerson]),
            technical_manager: this.formBuilder.array([this.createPerson]),
        });

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

    backPage() {
        this.router.navigate([this.fatherComponent]);
    }

    // addExpert(email: string, isManager: boolean = false) {
    //   let aux: string;
    //   if (isManager) aux = 'technical_manager';
    //   else aux = 'contact_people';
    //   this.http.post(REST_URL + 'experts/get_or_create/', { email }).subscribe(data => this.location[aux].push(data));
    // }

    // removeExpert(id: number, isManager: boolean = false) {
    //   let aux: string;
    //   if (isManager) aux = 'technical_manager';
    //   else aux = 'contact_people';
    //   if (this.location.id) this.api.update('locations', this.location.id, this.location).subscribe(_ => this.location[aux].splice(this.location[aux].findIndex(value => value.id === id), 1));
    // }

    // searchInstitution(value: string) {
    //   this.http.get(REST_URL + 'institutions', { params: { search: value } }).subscribe((data: any) => this.searchResults = data);
    //   return;
    // }

    // selectInstitution(id: number, company_name: string) {
    //   this.location.institution = { id, company_name };
    // }

    // removeInstitution() {
    //   this.location.institution = {};
    //   return;
    // }

}

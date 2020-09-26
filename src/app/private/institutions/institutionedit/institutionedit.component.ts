import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { REST_URL } from '../../../shared/REST_API_URLs';
import { HttpClient } from '@angular/common/http';

import { Institution } from '../instituitions.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-institutionedit',
    templateUrl: './institutionedit.component.html'
})
export class InstitutioneditComponent implements OnInit {
    id: number;
    institution: Institution;
    institutionForm: FormGroup;

    //regex para validação
    numberPattern = /^[0-9]*$/;
    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    cepPattern = ""; //Definir Regex

    endPoint = 'institutions';
    fatherComponent = '/institutions';

    constructor(private api: ApiServiceService,
        private http: HttpClient,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        //Inicializa FormBuilder
        this.createForm();

        //Captura o id por meio da rota
        this.id = this.activateRoute.snapshot.params.id;

        //Para cadastro de uma nova instituição.
        if (this.id != -1)
            this.api.getOne(this.endPoint, this.id).subscribe(data => {
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

    /* @description: Submete o form de cadastro de cidade.
     * @return {void};
     */
    onSubmit() {
        // stop here if form is invalid
        if (this.institutionForm.invalid) {
            return;
        }
        //passa os valores do form para o modelo
        this.institution = this.institutionForm.value;

        // Se o id ja existir atualiza a cidade existente se não cria uma nova cidade
        if (this.institution.id != -1) {
            this.update();
        } else {
            this.create();
        }

        this.backPage();
    }

    /*
     * @desciption: Retorna para a página anterior
     */
    backPage() {
        this.router.navigate([this.fatherComponent]);
    }

    /*
     * @desciption: Cria formulário usando ReactiveForms
     */
    createForm() {
        this.institutionForm = this.formBuilder.group({
            company_name: ['', [Validators.required]],
            fantasy_name: ['', [Validators.required]],
            cnpj: ['', [Validators.required]],
            goal: [''],
            aimed_people: ['', [Validators.required]],
            aimed_people_age: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
            capacity_free: ['', [Validators.pattern(this.numberPattern)]],
            capacity_free_m: ['', [Validators.pattern(this.numberPattern)]],
            capacity_free_f: ['', [Validators.pattern(this.numberPattern)]],
            capacity_used: ['', [Validators.pattern(this.numberPattern)]],
            capacity_used_m: ['', [Validators.pattern(this.numberPattern)]],
            capacity_used_f: ['', [Validators.pattern(this.numberPattern)]],
            contato: this.formBuilder.group({
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
                telefone: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
                fax: ['']
            }),
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
            contact_people: this.formBuilder.group({
                id: ['', [Validators.pattern(this.numberPattern)]],
                email: ['', [Validators.pattern(this.emailPattern)]]
            }), //criar um array de pessoas
            technical_manager: this.formBuilder.group({
                id: ['', [Validators.pattern(this.numberPattern)]],
                email: ['', [Validators.pattern(this.emailPattern)]]
            }), //criar um array de tecnicos
            legal_nature: [''],
            note: [''],
        });
    }
}

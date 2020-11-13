import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { REST_URL } from '../../../shared/REST_API_URLs';
import { HttpClient } from '@angular/common/http';

import { Institution } from '../instituitions.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

    // addExpert(email: string, isManager: boolean = false) {
    //     let aux: string;
    //     if (isManager) aux = 'technical_manager';
    //     else aux = 'contact_people';
    //     this.http.post(REST_URL + 'experts/get_or_create/', { email }).subscribe(data => this.institution[aux].push(data));
    // }

    // removeExpert(id: number, isManager: boolean = false) {
    //     let aux: string;
    //     if (isManager) aux = 'technical_manager';
    //     else aux = 'contact_people';
    //     if (this.institution.id) this.api.update('institutions', this.institution.id, this.institution).subscribe(_ => this.institution[aux].splice(this.institution[aux].findIndex(value => value.id === id), 1));
    // }

    get email_people() {
        return this.institutionForm.get('email_people') as FormArray;
    }
    
    get phone_people() {
        return this.institutionForm.get('phone_people') as FormArray;
    }

    /*
     * @description: adiciona mais um campo para contato no form. 
     */
    addEmail() {
        this.email_people.push(this.createEmail());
    }

    /*
     * @description: remove um campo para contato no form. 
     */
    removeEmail(index:number) {
        this.email_people.removeAt(index);
    }

    /*
     * @description: adiciona mais um campo para responsavel tecnico no form. 
     */
    addPhone() {
        this.phone_people.push(this.createPhone());
    }

    /*
     * @description: remove um campo para responsável tecnico no form. 
     */
    removePhone(index:number) {
        this.phone_people.removeAt(index);
    }

    /*
     *@ description: cria um Form group para cadastro de pessoas.
     * Colocar dentro de um FormArray.
     */
    createEmail(): FormGroup {
        return this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required,Validators.pattern(this.emailPattern)]]
        });
    }

    createPhone(): FormGroup {
        return this.formBuilder.group({
            name: ['', [Validators.required]],
            number: ['', [Validators.required,Validators.pattern(this.numberPattern)]]
        });
    }

    /* @description: Submete o form de cadastro de cidade.
     * @return {void};
     */
    onSubmit() {
        // stop here if form is invalid
        if (this.institutionForm.invalid) {
            return undefined;
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
                telefone: ['', [Validators.required, Validators.pattern(this.numberPattern)]]
            }),
            address: this.formBuilder.group({
                address: ['', [Validators.required]],
                number: ['', [Validators.required]],
                district: ['', [Validators.required]],
                cep: ['', [Validators.required]], //cep pattern
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                country: ['', [Validators.required]],
                reference_point: [''],
                latitude: [''],
                longitude: ['']
            }),
            email_people: this.formBuilder.array([this.createEmail()]), //criar um array de pessoas
            phone_people: this.formBuilder.array([this.createPhone()]), //criar um array de tecnicos
            legal_nature: [''],
            note: [''],
        });
    }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Offer } from '../offers.model';

@Component({
    selector: 'app-offeredit',
    templateUrl: './offeredit.component.html'
})
export class OffereditComponent implements OnInit {
    id: number;
    offer: Offer;
    offerForm: FormGroup;

    endPoint = 'offers';
    fatherComponent = '/offers';

    numberPattern = /^[0-9]*$/;

    constructor(private api: ApiServiceService,
        private http: HttpClient,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        //Inicializa FormBuilder
        this.createForm();

        //Captura o id por meio da rota
        this.id = this.activateRoute.snapshot.params.id;

        //Para cadastro de uma nova instituição.
        if (this.id != -1)
            this.api.getOne(this.endPoint, this.id).subscribe(data => {
                this.offer = data;
            });
    }

    /* @description: Submete o form de cadastro de cidade.
     * @return {void};
     */
    onSubmit() {
        // stop here if form is invalid
        if (this.offerForm.invalid) {
            return undefined;
        }
        //passa os valores do form para o modelo
        this.offer = this.offerForm.value;

        // Se o id ja existir atualiza a cidade existente se não cria uma nova cidade
        if (this.offer.id != -1) {
            this.update();
        } else {
            this.create();
        }

        this.backPage();
    }

    update() {
        this.api.update(this.endPoint, this.id, this.offer).subscribe();
    }

    create() {
        this.api.create(this.endPoint, this.offer).subscribe();
    }

    /*
     * @desciption: Retorna para a página anterior
     */
    backPage() {
        this.router.navigate([this.fatherComponent]);
    }

    createForm() {
        this.offerForm = this.formBuilder.group({
            open_enrol: ['', [Validators.required]], //matricula aberta
            environment: ['', [Validators.required]], //open or closed
            start_date: ['', [Validators.required]],
            final_date: ['', [Validators.required]],
            continuous_flow: ['', [Validators.required]],
            time: ['', [Validators.required]],
            specific_aim: ['', [Validators.required]],
            value: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
            excemption: ['', [Validators.required]], //isenção
            motivation: ['', [Validators.required]],
            requirements: ['', [Validators.required]],
            healthy_aging: ['', [Validators.required]], //envelhecimento saudavel
            partners: [''],
            home_care: [''],
            comments: [''],
        });
    }

}

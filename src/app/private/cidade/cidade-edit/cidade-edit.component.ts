import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../cidade.model';


@Component({
    selector: 'app-cidadeedit',
    templateUrl: './cidade-edit.component.html'
})

export class CidadeEditComponent implements OnInit {
    
    city: City;

    regForm: FormGroup;

    id: number;

    //mudar conforme o registro
    endPoint = 'cidades';
    fatherComponent = '/cidades';


    constructor(private api: ApiServiceService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder) {
    }


    ngOnInit(): void {
        this.regForm = this.formBuilder.group({
            cityName: ['', [Validators.required]],
            state: ['', [Validators.required]],
            country: ['', [Validators.required]],
        });

        //Seta o id com base na rota
        this.id = this.activateRoute.snapshot.params.id;   

        // Caso o id da cidade ja exista preenche o formulário com os da requisição
        if (this.id != -1) {
            this.api.getOne(this.endPoint, this.id).subscribe(data => {
                this.city = data;
                console.log(">>>>>Testando Dados da API")
                console.log(data);
                this.regForm.patchValue({
                    cityName: this.city.cityName,
                    state: this.city.state,
                    country: this.city.country,
                })
            });
        }
    }


    get f() { return this.regForm.controls; }

    update() {
        this.api.update(this.endPoint, this.id, this.city).subscribe();
    }

    create() {
        this.api.create(this.endPoint, this.city).subscribe();
    }

    /* @description: Submete o form de cadastro de cidade.
     * @return {void};
     */
    onSubmit() {
        // stop here if form is invalid
        if (this.regForm.invalid) {
            return;
        }
        //passa os valores do form para o modelo
        this.city = this.regForm.value;

        // Se o id ja existir atualiza a cidade existente se não cria uma nova cidade
        if (this.id) {
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
}
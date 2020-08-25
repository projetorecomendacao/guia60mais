import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../shared/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Estrutura do registro de dados..
interface reg {
  cityName: string;
  state: string;
  country: string;
}


@Component({
  selector: 'app-cidadeedit',
  templateUrl: './cidade-edit.component.html'
})

export class CidadeEditComponent implements OnInit {
  regForm: FormGroup;
  submitted = false;
  id: number;
  registro: reg;
  //mudar conforme o registro
  endPoint = 'cidades';
  fatherComponent = '/cidades';


  constructor(private api: ApiServiceService,  
              private activateRoute: ActivatedRoute, private router: Router, 
              private formBuilder: FormBuilder) { 

  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      cityName: ['',[Validators.required]],
      state: ['',[Validators.required]],
      country: ['',[Validators.required]],
    });
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id != -1 ) {
      this.api.getOne(this.endPoint, this.id).subscribe(data => {
        this.registro = data;
        this.regForm = this.formBuilder.group({
          cityName: [this.registro.cityName,[Validators.required]],
          state: [this.registro.state,[Validators.required]],
          country: [this.registro.country,[Validators.required]],
        });
      });
    }
   } 
  

  get f() { return this.regForm.controls; }

  update() {
    //this.api.update(this.endPoint, this.id, this.registro).subscribe();
    this.api.update(this.endPoint,this.id,this.registro).subscribe();;
  }

  create() {
    //this.api.create(this.endPoint, this.registro).subscribe();
    this.api.create(this.endPoint,this.registro).subscribe();;
    console.log('criou??');
  }


  onSubmit() {
    //muda o status do form
    this.submitted = true;

    // stop here if form is invalid
    if (this.regForm.invalid) {
        return;
    }
    //passa os valores do form para o modelo
    this.registro = this.regForm.value;
    
    //teste
    console.log(this.regForm.value);
    console.log(this.registro);
    
    if (this.id != -1) {
      this.update();
    } else {
      this.create();
    }
    this.router.navigate([this.fatherComponent]);
  }

  onReset(){
    this.router.navigate([this.fatherComponent]);
  }
}
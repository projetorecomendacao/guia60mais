import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneType } from 'src/app/shared/models/phonetype';

@Component({
  selector: 'app-phonetypeedit',
  templateUrl: './phonetypeedit.component.html',
  styleUrls: ['./phonetypeedit.component.css']
})
export class PhonetypeeditComponent implements OnInit {

  id : number;
  phoneType : PhoneType;
  endPoint = 'phone_type';
  fatherComponente = '/phonetype';

  constructor(private api: ApiServiceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.phoneType = new PhoneType();
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id != -1){
      this.api.getOne(this.endPoint,this.id).subscribe(data => {
        console.log(data)
        this.phoneType = data;
      }, error => console.log(error));
    } else {
      this.phoneType = new PhoneType();
    }
  }

  update() {
    this.api.update(this.endPoint,this.id, this.phoneType).subscribe(data => {
      console.log(data)
    }, error => console.log(error)); 
  }

  create(){
    this.api.create(this.endPoint, this.phoneType).subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }


  salvar() {
    console.log(this.phoneType);
    if (this.id != -1){ 
      this.update();
    } else {
      this.create();
    } 
    this.router.navigate([this.fatherComponente]);   
  }

}

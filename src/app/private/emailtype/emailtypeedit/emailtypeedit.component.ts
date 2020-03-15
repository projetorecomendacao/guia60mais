import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailType } from 'src/app/shared/models/emailtype';

@Component({
  selector: 'app-emailtypeedit',
  templateUrl: './emailtypeedit.component.html',
  styleUrls: ['./emailtypeedit.component.css']
})
export class EmailtypeeditComponent implements OnInit {

  id : number;
  emailType : EmailType;
  endPoint = 'email_type';
  fatherComponente = '/emailtype';

  constructor(private api: ApiServiceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id != -1){
      this.api.getOne(this.endPoint,this.id).subscribe(data => {
        console.log(data)
        this.emailType = data;
      }, error => console.log(error));
    } else {
      this.emailType = new EmailType();
    }
  }

  update() {
    this.api.update(this.endPoint,this.id, this.emailType).subscribe(data => {
      console.log(data)
    }, error => console.log(error)); 
  }

  create(){
    this.api.create(this.endPoint, this.emailType).subscribe(data => {
      console.log(data)
    }, error => console.log(error))
  }


  salvar() {
    console.log(this.emailType);
    if (this.id != -1){ 
      this.update();
    } else {
      this.create();
    } 
    this.router.navigate([this.fatherComponente]);   
  }

}

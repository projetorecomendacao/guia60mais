import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phonetype',
  templateUrl: './phonetype.component.html',
  styleUrls: ['./phonetype.component.css']
})
export class PhonetypeComponent implements OnInit {
  title = 'Phone Type';
  members = [];
  endPoint = 'phone_type';  
  editComponent = 'phonetypeEdit';

  constructor(private api: ApiServiceService, private router : Router) {
    this.getAll();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => {
    this.api.getAll(this.endPoint).subscribe(
      data => {
        this.members = data
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    )
  };


  delete (id: number){
    this.api.delete(this.endPoint, id).subscribe(
      data => {
        this.members = data;
        this.getAll();
      },
      error => {
        console.log("Aconteceu um erro", error.message);
      }
    )  
  }

  update (id: number){
    this.router.navigate([this.editComponent, id]);
  }

  create(){
    this.router.navigate([this.editComponent, -1]);
  }
  
}

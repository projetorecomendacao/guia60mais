import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../../shared/api-service.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-locationedit',
  templateUrl: './locationedit.component.html'
})
export class LocationeditComponent implements OnInit {
  id: number;
  activity;
  endPoint = 'activities';
  fatherComponent = '/activities';

  constructor(private api: ApiServiceService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activity = {
      characteristic: [],
      benefit: [],
      restriction: [],
      type: []
    };
    this.id = this.activateRoute.snapshot.params.id;
    if (this.id != -1 )
      this.api.getOne(this.endPoint, this.id).subscribe(data => this.activity = data);
  }

  update() {
    this.api.update(this.endPoint, this.id, this.activity).subscribe();
  }

  create() {
    this.api.create(this.endPoint, this.activity).subscribe();
  }


  salvar() {
    console.log(this.activity);
    if (this.id != -1) this.update();
    else this.create();

    this.router.navigate([this.fatherComponent]);
  }

  addDetail(value: string, endPoint: string) {
    this.api.create(endPoint, { description: value }).subscribe(data => this.activity[endPoint].push(data));
  }

  removeDetail(id: number, endPoint: string) {
    this.api.delete(endPoint, id).subscribe(_ => this.activity[endPoint].splice(this.activity[endPoint].findIndex(value => value.id === id), 1));
  }


}

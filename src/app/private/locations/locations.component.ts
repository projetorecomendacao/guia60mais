import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../../shared/api-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {
  title = 'Locations';
  members = [];
  endPoint = 'locations';
  editComponent = 'locationEdit';

  constructor(private api: ApiServiceService, private router: Router) {
    this.getAll();
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getAll(this.endPoint).subscribe(data => this.members = data);
  }

  delete(id: number) {
    this.api.delete(this.endPoint, id).subscribe(
        data => {
          this.members = data;
          this.getAll();
        }
    );
  }

  update(id: number) {
    this.router.navigate([this.editComponent, id]);
  }

  create() {
    this.router.navigate([this.editComponent, -1]);
  }
}

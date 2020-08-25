import { Component, OnInit } from '@angular/core';
import { UserService } from '../security/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html'
})
export class PrivateComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}

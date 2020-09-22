import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basico',
  templateUrl: './basico.component.html'
})
export class BasicoComponent implements OnInit {
  @Input() RegForm: FormGroup;
  
  //
  @Input() campo: string; 
  
  
  @Input() enviado: boolean;
  
  //Rotulo a cima do input
  @ Input() rotulo : string;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.RegForm);
  }

  invalido(): boolean{
    if (!this.RegForm.get(this.campo).valid && this.enviado){
      return true;
    }
    return false;
  }
}

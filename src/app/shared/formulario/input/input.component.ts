import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

    //Recebe o label do input
    @Input() label: string;
    //Recebe a mensagem de erro do input
    @Input() errorMessage: string;
    //Para campos obrigatórios
    @Input() required: boolean;

    input: any;

    @ContentChild(NgModel) model: NgModel;
    @ContentChild(FormControlName) control: FormControlName;

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.input = this.model || this.control;
        if (this.input === undefined) {
            throw new Error('Esse componente precisa ser usado como uma diretiva ngModel ou formControlName!');
        }
    }

    //Caso o input tenha sido preenchido corretamente
    hasSuccess(): boolean {
        return this.input.valid && (this.input.dirty || this.input.touched)
    }

    //Caso o input tenha sido preenchido de maneira incorreta
    hasError(): boolean {
        return this.input.invalid && (this.input.dirty || this.input.touched)
    }
}

import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { REST_URL_EXPERTS } from '../../shared/REST_API_URLs';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
        private authGuard: AuthGuard,
        private api: ApiServiceService
    ) {}

    ngOnInit() {
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
            userData => {
                console.log(userData.authToken);
                this.api.create(REST_URL_EXPERTS, {}).subscribe(_ => {
                    this.authGuard.setCanLoad(true);
                    this.router.navigate(['/private']);
                });
            },
            rejection => {
                this.authGuard.setCanLoad(false);
                console.error(rejection);
            }
        );
    }
}

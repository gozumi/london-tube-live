import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp(environment.firebase.config, environment.firebase.authConfig)
    ],
    declarations: [],
    providers: [
        AuthService
    ]
})
export class AuthModule { }

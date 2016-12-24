import { TestBed } from '@angular/core/testing';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { AuthService } from '../auth.service';

export class Fixture {
    authService: any;

    constructor() {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: AngularFire, useValue: true },
                {
                    provide: FirebaseAuth, useValue: {
                        subscribe: () => { }
                    }
                }
            ]
        });

        this.authService = TestBed.get(AuthService);
    }
}

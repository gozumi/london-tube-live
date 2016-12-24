import { TestBed } from '@angular/core/testing';
import { StoreService } from '../store.service';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../../services/auth/auth.service';

export class Fixture {
    storeService: any;

    constructor() {
        TestBed.configureTestingModule({
            providers: [
                StoreService,
                { provide: AngularFire, useValue: true },
                { provide: AuthService, useValue: true }
            ]
        });

        this.storeService = TestBed.get(StoreService);
    }
}

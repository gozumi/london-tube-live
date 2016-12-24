import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { MaterialModule } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';


export class Fixture {
    testBedFixture: ComponentFixture<AppComponent>;

    constructor() {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot(),
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: AuthService, useValue: true }
            ]
        });

        this.testBedFixture = TestBed.createComponent(AppComponent);
    }
}

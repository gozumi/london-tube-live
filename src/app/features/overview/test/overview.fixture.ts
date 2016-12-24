import { Component, Input } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { OverviewComponent } from '../overview.component';
import { StoreService } from '../../../data/store/store.service';
import { AuthService } from '../../../services/auth/auth.service';

export class Fixture {
    testBedFixture: ComponentFixture<OverviewComponent>;

    constructor() {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MaterialModule.forRoot(),
                RouterTestingModule
            ],
            declarations: [
                OverviewComponent
            ],
            providers: [
                { provide: StoreService, useValue: true },
                { provide: AuthService, useValue: true }
            ]
        })
        .compileComponents();

        this.testBedFixture = TestBed.createComponent(OverviewComponent);
    }
}
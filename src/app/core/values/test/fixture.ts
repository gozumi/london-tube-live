import { TestBed } from '@angular/core/testing';
import { ValuesService } from '../values.service';

export class Fixture {
    valuesService: ValuesService;

    constructor() {
        TestBed.configureTestingModule({
            providers: [ValuesService]
        });

        this.valuesService = TestBed.get(ValuesService);
    }
}

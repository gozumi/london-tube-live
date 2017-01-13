import { TestBed } from '@angular/core/testing';
import { TflRoutesService } from '../tfl-routes';

export class Fixture {
    tflRouteService: TflRoutesService;

    constructor() {
        TestBed.configureTestingModule({
            providers: [TflRoutesService]
        });

        this.tflRouteService = TestBed.get(TflRoutesService);
    }
}
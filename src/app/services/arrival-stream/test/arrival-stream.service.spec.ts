import { Fixture } from './arrival-stream.fixture';
import { ArrivalStreamService } from '../arrival-stream.service';
import { fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

describe('service: ArrivalStreamService', () => {
    let fixture: Fixture;
    let arrivalStreamService: ArrivalStreamService;

    describe('when expected data is recieved', () => {
        beforeEach(() => {
            fixture = new Fixture();
            arrivalStreamService = fixture.getArrivalStream();
        });

        it('should emit the correct data stream', <any>fakeAsync((): void => {
            let currentData;
            arrivalStreamService.get().subscribe(streamData => {
                currentData = streamData;
            });

            expect(currentData).toEqual(fixture.getTestData());
            tick(120000);
            expect(currentData).toEqual(fixture.getTestData());
            discardPeriodicTasks();
        }));
    });

    describe('when the call to the tfl stream service returns no data', () => {
        beforeEach(() => {
            fixture = new Fixture();
            arrivalStreamService = fixture.getArrivalStreamNoReturnData();
        });

        it('should emit an empty array', <any>fakeAsync((): void => {
            let currentData;
            arrivalStreamService.get().subscribe(streamData => {
                currentData = streamData;
            });

            expect(currentData).toEqual(fixture.getEmptyTestData());
            discardPeriodicTasks();
        }));
    });

    describe('when the call to the tfl stream service returns an error', () => {
        beforeEach(() => {
            fixture = new Fixture();
            arrivalStreamService = fixture.getArrivalStreamError();
        });

        it('should throw an error', <any>fakeAsync((): void => {
            let currentData,
                errorThrown = false;

            arrivalStreamService.get().subscribe(
                streamData => currentData = streamData,
                error => errorThrown = true
            );

            expect(errorThrown).toEqual(true);
            discardPeriodicTasks();
        }));
   });
});

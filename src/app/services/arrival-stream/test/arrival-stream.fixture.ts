import { TestBed } from '@angular/core/testing';
import { CoreModule } from '../../../core/core.module';
import { TestModule } from '../../../../test/test.module';
import { TestModule as TestModuleNoReturnData} from '../../../../test/test-no-return-data.module';
import { TestModule as TestModuleError} from '../../../../test/test-error.module';
import { ArrivalStreamService } from '../arrival-stream.service';

export class Fixture {

    constructor() {}

    getArrivalStream(): ArrivalStreamService {
        TestBed.configureTestingModule({
            imports: [TestModule, CoreModule],
            providers: [ArrivalStreamService]
        });
        return TestBed.get(ArrivalStreamService);
    }

    getArrivalStreamNoReturnData(): ArrivalStreamService {
        TestBed.configureTestingModule({
            imports: [TestModuleNoReturnData, CoreModule],
            providers: [ArrivalStreamService]
        });
        return TestBed.get(ArrivalStreamService);
    }

    getArrivalStreamError(): ArrivalStreamService {
        TestBed.configureTestingModule({
            imports: [TestModuleError, CoreModule],
            providers: [ArrivalStreamService]
        });
        return TestBed.get(ArrivalStreamService);
    }

    public getTestData() {
        return [{ foo: 'bar' }];
    }

    public getEmptyTestData() {
        return [];
    }
}

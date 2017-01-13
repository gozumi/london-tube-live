import { Fixture } from './fixture';
import { ValuesService } from '../values.service';

describe('service: ValuesService', () => {
    let valuesService: ValuesService;

    beforeEach(() => {
        valuesService = (new Fixture()).valuesService;
    });

    it('should contain the correct top level properties', () => {
        expect(valuesService.endpoints).toBeDefined;
        expect(valuesService.tflRoutes).toBeDefined;
    });
});

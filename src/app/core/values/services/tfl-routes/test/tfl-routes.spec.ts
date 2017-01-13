/* tslint:disable:no-unused-variable */

import { Fixture } from './fixture';
import { TflRoutesService } from '../tfl-routes';

describe('service: TflRoutesService', () => {
    let tflRoutesSetvice: TflRoutesService;

    beforeEach(() => {
        tflRoutesSetvice = (new Fixture()).tflRouteService;
    });

    it('should return the correct values', () => {
        expect(tflRoutesSetvice.jubilee).toEqual('jubilee');
    });
});

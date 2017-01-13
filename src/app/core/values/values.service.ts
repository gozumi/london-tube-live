import { Injectable } from '@angular/core';
import { EndpointsService } from './services/endpoints/endpoints.service';
import { TflRoutesService } from './services/tfl-routes/tfl-routes';

/**
 * This class provides various useful values that are needed throughout the application. It removes the need to hard-code values directly into the app allowing for easy maintenance when value need to be changed.
 * 
 * The methods provided by this class are environment aware when they need to be allowing them to provide environment specific values where appropriate. This can be used to provide environment specific endpoints.
 */
@Injectable()
export class ValuesService {
    public endpoints: EndpointsService = new EndpointsService();
    public tflRoutes: TflRoutesService = new TflRoutesService();

    constructor() { }
}

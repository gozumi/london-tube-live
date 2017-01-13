import { Injectable } from '@angular/core';

/**
 * This class instantiates an object that contains the names of the TFL routes used by the application.
 */
@Injectable()
export class TflRoutesService {
    readonly jubilee: string = 'jubilee';

    constructor() { }
}

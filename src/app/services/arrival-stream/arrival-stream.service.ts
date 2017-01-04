import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';

/**
 * This class creates an observable that emits the current status of the london tube network.
 * The emissions occur at 2 minute intervals.
 */
@Injectable()
export class ArrivalStreamService {
    private stream: Observable<any>;
    private url: string = environment.endpoint.arrivals;

    /**
     * The constructor simply receives the injected dependencies
     * @param http  The angular http service.
     */
    constructor(private http: Http) {
        let interval = Observable.interval(120000)
            .flatMap(this.getData.bind(this));

        this.stream = Observable.merge(this.getData(), interval);
    }

    /**
     * The “get” method returns the observable that emits the london tube network status at regular
     * intervals.
     * @returns The observable that emits the status.
     */
    get(): Observable<any> {
        return this.stream;
    }

    /**
     * This fetches the data for the next emission
     */
    getData() {
        return this.http.get(this.url)
            .map(this.extractData);
    }

    /**
     * This method returns the useful data from the response data.
     */
    private extractData(response: Response) {
        let body = response.json();
        return body || [];
    }
}

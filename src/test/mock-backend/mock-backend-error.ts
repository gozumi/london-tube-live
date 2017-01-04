import { Injectable } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';

let self: MockBackendService;

/**
 * This service implements the mock backend that is used by the unit tests. It
 * intercepts the http calls and provides mock responses to those calls.
 */
@Injectable()
export class MockBackendService {

    constructor() {
        self = this;
    }

    /**
     * This method maps requests to mock responses.
     * @param backend An insance of the angular MockBackend class used to access the request connections. 
     * @param options An instance of the angular BaseRequestOptions class used to augment the request options.
     */
    mockBackendImpl(backend: MockBackend, options: BaseRequestOptions): Http {
        backend.connections.subscribe((connection: MockConnection) => {
            connection.mockError(new Error('error'));
        });
        return new Http(backend, options);
    }
}

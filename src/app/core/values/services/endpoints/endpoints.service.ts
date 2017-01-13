import { environment } from '../../../../../environments/environment';

export class EndpointsService {

    private endpoints = {
        arrivals: 'line/<1>/arrivals',
        routeInbound: '/line/<1>/route/sequence/inbound',
        routeOutbound: '/line/<1>/route/sequence/outbound'
    };

    constructor() { }

    /**
     * This method returns the URL of the arrival endpoint. This endpoint returns the arrival times of the vehicles on  given TFL route.
     * 
     * @param route This parameter specifies the TFL route in question.
     */
    getArrivals(route: string): string {
        let returnValue:string = environment.endpointPrefixes.tfl.concat(this.endpoints['arrivals']);
        return returnValue.replace('<1>', route);
    }

    /**
     * This method returns the URL of the routeInbound endpoint. This endpoint returns the stop points of a given TFL route in the “inbound” direction.
     * 
     * @param route This parameter specifies the TFL route in question.
     */
    getInboundRoute(route): string {
        let returnValue:string = environment.endpointPrefixes.tfl.concat(this.endpoints['routeInbound']);
        return returnValue.replace('<1>', route);
    }
}

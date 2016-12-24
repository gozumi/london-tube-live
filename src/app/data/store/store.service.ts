import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../services/auth/auth.service';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/let';
import { Action } from '../actions';
import { reducer } from '../reducers';

/**
 * This class provides interation with the store. It exposes methods that allow the consumer to perform actions that read from the store 
 * or make changes to the store.
 */
@Injectable()
export class StoreService {
    public blogList: FirebaseListObservable<any>;

    /**
     * @param   af  The injected AngularFire service, used to access the firebase database functionality.
     * @param   auth The injected AuthService.  
     */
    constructor(private af: AngularFire, private auth: AuthService) {}

    /**
     * This method returns the list of all blogs in the store.
     */
    getData(): FirebaseListObservable<any> {
        return this.af.database.list(`/data`);
    }

    /**
     * This method dispathes actions to the store. These actions will potentially change the state of the store.
     */
    dispatch(action: Action) {
        let actionFn = reducer[action.type];

        actionFn(action.payload, {
            af: this.af,
            uid: this.auth.getUid()
        });
    }

}

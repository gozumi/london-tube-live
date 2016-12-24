import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

/**
 * This class provides the authentication functionality to the application.
 */
@Injectable()
export class AuthService {
    authStateObservable: Subject<FirebaseAuthState> = new Subject<FirebaseAuthState>();
    private authState: FirebaseAuthState;

    /**
     * @param   af The injected AngularFire service, used to access the firebase authentication functionality.
     * @param state The injected FirebaseAuth observable, used to detect changes to the firebase authorisation state.
     */
    constructor(
        private af: AngularFire,
        private state: FirebaseAuth
    ) {
        this.state.subscribe(authState => {
            if (authState !== null) {
                this.authState = authState;
            } else {
                this.authState = null;
            }
        });
    }

    /**
     * This method initiates the firebase authentication process.
     */
    signIn() {
        this.af.auth.login();

    }

    /**
     * Thhis method logs the user out from firebase.
     */
    signOut() {
        this.af.auth.logout();
    }

    /**
     * This method returns the “uid” of the current user. This is needed when accessing some parts of the firebase database.
     */
    getUid(): string {
        return this.authState ? this.authState.uid : null;
    }
}

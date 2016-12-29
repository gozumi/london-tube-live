import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

/**
 * This component renders the application header and the outlet.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'gaff app';

    /**
     * @param   auth The injected AuthService.
     */
    constructor(private auth: AuthService) { }

    ngOnInit() { }

    /**
     * This method initiates the sign in process. The application is setup to use Google authentication.
     */
    signIn() {
        this.auth.signIn();
    }

    /**
     * This method signs the user out of the application.
     */
    signOut() {
        this.auth.signOut();
    }

}

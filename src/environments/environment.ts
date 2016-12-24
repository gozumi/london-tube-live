// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { AuthProviders, AuthMethods } from 'angularfire2';

export const environment = {
    production: false,
    firebase: {
        config: {
            apiKey: 'AIzaSyC0kCB-6SSTIBC_zqlIQctgq9e1qysk28Y',
            authDomain: 'london-tube-live-dev.firebaseapp.com',
            databaseURL: 'https://london-tube-live-dev.firebaseio.com',
            storageBucket: 'london-tube-live-dev.appspot.com',
            messagingSenderId: '906854038406'
        },
        authConfig: {
            provider: AuthProviders.Google,
            method: AuthMethods.Redirect
        }
    }
};

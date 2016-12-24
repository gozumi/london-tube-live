import { AuthProviders, AuthMethods } from 'angularfire2';

export const environment = {
    production: true,
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

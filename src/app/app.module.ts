import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { AuthModule } from './services/auth/auth.module';
import { AppSerivcesModule } from './services/app-serivces.module';
import { appRouting, appRoutingProviders } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        FeaturesModule,
        AuthModule,
        appRouting,
        AppSerivcesModule
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }

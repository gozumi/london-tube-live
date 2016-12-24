import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { featuresRouting, featuresRoutingProviders } from './features.routing';
import { MaterialModule } from '@angular/material';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        featuresRouting,
        MaterialModule.forRoot()
    ],
    declarations: [OverviewComponent],
    providers: [featuresRoutingProviders]
})
export class FeaturesModule { }

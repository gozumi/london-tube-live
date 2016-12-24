import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
    {
        path: 'overview',
        component: OverviewComponent
    }
];

export const featuresRoutingProviders: any[] = [];

export const featuresRouting: ModuleWithProviders = RouterModule.forRoot(routes);

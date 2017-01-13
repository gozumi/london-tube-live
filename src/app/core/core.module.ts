import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValuesService } from './values/values.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [ValuesService]
})
export class CoreModule { }

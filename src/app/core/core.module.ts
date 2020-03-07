import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptors/interceptors/token-interceptor.service';


@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, RouterModule, MaterialModule],
    exports: [],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }],
})
export class CoreModule { }
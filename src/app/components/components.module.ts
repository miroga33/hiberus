import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { LogInComponent } from './log-in/log-in.component';
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [HomeComponent, RegisterComponent, LogInComponent, UsersComponent],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

    ],
    entryComponents: [LogInComponent],
    exports: [],
    providers: [],
})
export class ComponentsModule { }
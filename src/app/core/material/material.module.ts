import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,

    ],
    exports: [MatFormFieldModule, MatInputModule, MatDialogModule,],
    providers: [],
})
export class MaterialModule { }
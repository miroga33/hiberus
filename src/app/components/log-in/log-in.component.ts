import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { AuthLoginDto } from '../../models/authLoginDto.model';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { Token } from '../../models/token.model';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private _auth: AuthenticationService, private dialog: MatDialog, private router: Router, private dialogRef: MatDialogRef<boolean>) { }

  ngOnInit() {

  }
  getErrorMessage() {
    if (this.username.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  logIn() {
    const authLoginDto: AuthLoginDto = {
      username: this.username.value,
      password: this.password.value
    }
    if (this.formValid()) {
      this._auth.logIn(authLoginDto).subscribe(
        (token: Token) => {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigateByUrl('/home');
          this.dialogRef.close(true);
        },
        (err) => {
          console.log(err);
          this.dialog.open(DialogComponent, { data: { title: 'Error', success: false, content: err.error.message } });
        }
      )
    }
  }

  formValid() {
    return this.username.valid && this.password.valid;
  }
}

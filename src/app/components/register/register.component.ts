import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Register } from '../../models/register.model';
import { MatDialog, MatCardLgImage } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { LogInComponent } from '../log-in/log-in.component';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account_validation_messages = {
    username: [
      { type: "required", message: "Required" },
      { type: "email", message: "Insert a valid email" },
      { type: "validUsername", message: "Your username has already been taken" }
    ],
    confirmPassword: [
      { type: "required", message: "Required" },
      { type: "mustMatch", message: "Passwords do not match" }
    ],
    password: [
      { type: "required", message: "Required" },
      {
        type: "minlength",
        message: "Must contain at least 6 characters"
      }
    ]
  };

  errors = {
    usuername: "",
    password: "",
    confirmPassword: "",
  };
  public registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _auth: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      confirmPassword: ["", [Validators.required]]
    });
    this.registerForm.setValidators([
      this.mustMatch("password", "confirmPassword")
    ]);

  }
  get f() {
    return this.registerForm.controls;
  }

  send() {
    this.showError();
    if (!this.registerForm.invalid) {
      const registerUser: Register = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      };

      this._auth.register(registerUser).subscribe(
        (data) => {
          const dialogRef = this.dialog.open(DialogComponent, { data: { title: 'Success', success: true, content: "Register success" } });
          this.reset();
          dialogRef.afterClosed().subscribe(result => {
            this.dialog.open(LogInComponent);
          })
        },
        (err) => {
          this.dialog.open(DialogComponent, { data: { title: 'Error', success: false, content: err.error.message } });
        });
    }
  }

  reset() {
    this.registerForm.reset();
  }
  //Valida que las contraseñas coincidan
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  //Muestra los mensajes de errors obtenidos en el formulario.
  showError() {
    for (const key in this.account_validation_messages) {
      for (const validation of this.account_validation_messages[key]) {
        if (this.f[key].hasError(validation.type)) {
          this.errors[key] = validation.message;
        }
      }
    }
  }
}

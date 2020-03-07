import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogInComponent } from '../log-in/log-in.component';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, public _auth: AuthenticationService) { }

  ngOnInit() {
  }

  logIn() {
    this.dialog.open(LogInComponent);
  }
}

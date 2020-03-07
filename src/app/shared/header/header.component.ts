import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, public _auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
    const dialoRef = this.dialog.open(LogInComponent);
    dialoRef.afterClosed().subscribe(result => {
      if (result) {
        dialoRef.close();
      }
    })
  }
  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/home');
  }
}

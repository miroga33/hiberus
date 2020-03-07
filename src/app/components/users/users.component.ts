import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<User> = [];

  constructor(private _users: UsersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._users.getUsers().subscribe(
      (data: Array<User>) => {
        this.users = data;
      },
      (err) => {
        this.dialog.open(DialogComponent, { data: { title: 'Error', success: false, content: err.error.message } });
      }
    )
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(DialogComponent, { data: { title: 'Delete ', success: false, content: 'Are you sure?', action: 'question' } });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._users.delete(id).subscribe(
          (data: Array<User>) => {
            this.getUsers();
            this.dialog.open(DialogComponent, { data: { title: 'Success', success: true, content: 'Delete completed successfully' } });
          },
          (err) => {
            this.dialog.open(DialogComponent, { data: { title: 'Error', success: false, content: err.error.message } });
          }
        );
      }
    })
  }
}

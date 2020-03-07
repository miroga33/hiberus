import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../globals/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsers() {
    const url = `${environment.apiBase}users`;
    return this.http.get(url);
  }
  delete(_id: string) {
    const url = `${environment.apiBase}users/${_id}`;
    return this.http.delete(url);
  }
}

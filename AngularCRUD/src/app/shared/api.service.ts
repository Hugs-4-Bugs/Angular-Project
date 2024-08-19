import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getEmployee() {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  postEmployee(data : any ){
    return this.http.post<any>("http://localhost:3000/posts", data)
    .pipe()
  }
}

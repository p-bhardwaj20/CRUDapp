import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any): Observable<any>{
    return this.http.post<any>("http://localhost:8000/employeeList/", data);
  }

  getEmployee(): Observable<any>{
   return this.http.get<any>("http://localhost:8000/employeeList/");
  }

  putEmployee(data: any, id: number){
    return this.http.put<any>("http://localhost:8000/employeeList/"+id,data);
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:8000/employeeList/"+id);
  }
}

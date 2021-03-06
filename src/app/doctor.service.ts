import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/models/doctor';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://127.0.0.1:5002/api/doctor/';
  constructor(private http: HttpClient) { }

  public getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl + 'getAll');
  }
 
  public addDoctor(data: any): Observable<Doctor> {
    var body = {
      "FirstName": String(data.FirstName),
      "LastName": String(data.LastName),
      "Qualification": String(data.Qualification),
      "Username": String(data.Username),
      "Email": String(data.Email),
      "Password": String(data.Password)
    };
    
    return this.http.post<Doctor>(this.apiUrl + 'add', body, httpOptions);
  }

  public updateDoctor(data: any, dId: Number): Observable<Doctor> {  
    var body = {
      "DId": dId,
      "FirstName": String(data.FirstName),
      "LastName": String(data.LastName),
      "Qualification": String(data.Qualification),
      "Username": String(data.Username),
      "Email": String(data.Email),
      "Password": String(data.Password)
    };
    return this.http.put<Doctor>(this.apiUrl + 'update', body, httpOptions);  
  }
  public deleteDoctorById(dId: any){  
    return this.http.delete<any>(this.apiUrl + 'delete', {params: {"dId": dId}});  
  }

  public getDoctorById(dId: number): Observable<Doctor> {  
    return this.http.get<Doctor>(this.apiUrl + 'getById?dId=' + dId);  
  }

}

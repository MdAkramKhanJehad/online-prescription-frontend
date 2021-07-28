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
 
  public addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl + 'add', doctor, httpOptions);
  }

  public updateDoctor(doctor: Doctor): Observable<Doctor> {  
    return this.http.put<Doctor>(this.apiUrl + 'update', doctor, httpOptions);  
  }

  public getDoctorById(dId: number): Observable<Doctor> {  
    return this.http.get<Doctor>(this.apiUrl + 'getById?dId=' + dId);  
  }

}

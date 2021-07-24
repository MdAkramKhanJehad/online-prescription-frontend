import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pid } from 'process';
import { Observable } from 'rxjs';
import { Prescription } from 'src/models/prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = 'http://127.0.0.1:5002/api/prescription/';
  
  constructor(private http: HttpClient) { }

  public getAllPrescription(): Observable<Prescription[]>{
    return this.http.get<Prescription[]>(this.apiUrl + 'getAll');
  }
  
  public getPrescriptionById(pId: number): Observable<Prescription>{
    return this.http.get<Prescription>(this.apiUrl+'getById?pId=' + pid);
  }

  public updatePrescription(prescription: Prescription): Observable<Prescription> {  
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Prescription>(this.apiUrl + 'update', prescription);  
  }



  public addPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl + 'add', prescription);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorPrescription } from 'src/models/doctorPrescription';

@Injectable({
  providedIn: 'root'
})

export class DoctorPrescriptionService {

  private apiUrl = 'http://127.0.0.1:5002/api/doctorPrescription/';
  
  constructor(private http: HttpClient) { }

  public getAllDoctorPrescription(): Observable<DoctorPrescription[]>{
    return this.http.get<DoctorPrescription[]>(this.apiUrl + 'getAll');
  }
  
  public addDoctorPrescription(doctorPrescription: DoctorPrescription): Observable<DoctorPrescription> {
    return this.http.post<DoctorPrescription>(this.apiUrl + 'add', doctorPrescription);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicinePrescription } from 'src/models/medicinePrescription';

@Injectable({
  providedIn: 'root'
})

export class MedicinePrescriptionService {

  private apiUrl = 'http://127.0.0.1:5002/api/medicinePrescription/';
  
  constructor(private http: HttpClient) { }

  public getAllMedicinePrescription(): Observable<MedicinePrescription[]>{
    return this.http.get<MedicinePrescription[]>(this.apiUrl + 'getAll');
  }
  
  public addMedicinePrescription(medicinePrescription: MedicinePrescription): Observable<MedicinePrescription> {
    return this.http.post<MedicinePrescription>(this.apiUrl + 'add', medicinePrescription);
  }

}

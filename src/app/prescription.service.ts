import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pid } from 'process';
import { Observable } from 'rxjs';
import { MedicinePrescription } from 'src/models/medicinePrescription';
import { Prescription } from 'src/models/prescription';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = 'http://127.0.0.1:5002/api/prescription/';

  
  constructor(private http: HttpClient) { }

  public getAllPrescription(): Observable<Prescription[]>{
    var prescriptions = this.http.get<Prescription[]>(this.apiUrl + 'getAll');
    return prescriptions;
  }
  
  public getPrescriptionById(pId: number): Observable<Prescription>{
    var prescription =  this.http.get<Prescription>(this.apiUrl + 'getById' , {params: {"pId": String(pId)}});
    return prescription;
  }

  public updatePrescription(prescription: any, pId: number, medIds: Number[]): Observable<Prescription> {  
    var body = {
      "PId": pId,
      "PatientName": String(prescription.PatientName),
      "PatientAge": Number(prescription.PatientAge),
      "DateTime": prescription.DateTime, //new Date(prescription.dateTime),
      "DoctorId": Number(prescription.DoctorId),
      "MedicineIdsList": medIds
    }
    
    return this.http.put<Prescription>(this.apiUrl + 'update', body, httpOptions);  
  }

  public addPrescription(prescription: any, medicines: Number[]): Observable<Prescription> {
    var body = {
      "PatientName": String(prescription.PatientName),
      "PatientAge": Number(prescription.PatientAge),
      "DateTime": prescription.DateTime, //new Date(prescription.dateTime),
      "DoctorId": Number(prescription.DoctorId),
      "MedicineIdsList": medicines
    }
    medicines.forEach(ob => {
      console.log(ob);
    });

    return this.http.post<Prescription>(this.apiUrl + 'add', body, httpOptions);
  }

  public deletePrescriptionById(pId: any){  
    return this.http.delete<any>(this.apiUrl + 'delete', {params: {"pId": pId}});  
  }
}

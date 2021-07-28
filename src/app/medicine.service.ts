import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from 'src/models/medicine';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private apiUrl = 'http://127.0.0.1:5002/api/medicine/';
  
  constructor(private http: HttpClient) { }

  public getAllMedicine(): Observable<Medicine[]>{
    var response = this.http.get<Medicine[]>(this.apiUrl + 'getAll');
    return response;
  }
  
  public addMedicine(medicine: any): Observable<Medicine> {
    var body = {
      "Name": String(medicine.MedicineName),
      "Indication": String(medicine.Indication),
      "Usage": String(medicine.Usage),
      "Instruction": Number(medicine.Instruction)
    }
    return this.http.post<Medicine>(this.apiUrl + 'add', body, httpOptions);
  }

  public updateMedicine(medicine: any, mId: number): Observable<Medicine> {  
    var body = {
      "MId": mId,
      "Name": String(medicine.MedicineName),
      "Indication":String( medicine.Indication),
      "Usage": String(medicine.Usage),
      "Instruction": Number(medicine.Instruction)
  }
    return this.http.put<Medicine>(this.apiUrl + 'update', body, httpOptions);  
  } 

  public getMedicineById(mId: number): Observable<Medicine> {  
    return this.http.get<Medicine>(this.apiUrl + 'getById?mId=' + mId);  
  }

  public deleteMedicineById(mId: any){  
    return this.http.delete<any>(this.apiUrl + 'delete', {params: {"mId": mId}});  
  }

}

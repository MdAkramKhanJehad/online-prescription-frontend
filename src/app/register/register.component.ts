import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  Roles: any = ['Doctor'];
  registrationForm: any;
  private apiUrl = 'http://127.0.0.1:5002/api/doctor/';

  constructor(private router:Router, private formbulider: FormBuilder, public doctorService: DoctorService, private http: HttpClient) { }

  ngOnInit() {
    this.registrationForm = this.formbulider.group({  
      FirstName: ['', [Validators.required]],  
      LastName: ['', [Validators.required]],  
      Qualification: ['', [Validators.required]],  
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    }); 
  }


  onFormSubmit(data: any) {
    var body = {
      "FirstName": String(data.FirstName),
      "LastName": String(data.LastName),
      "Qualification": String(data.Qualification),
      "Username": String(data.Username),
      "Email": String(data.Email),
      "Password": String(data.Password)
    };
    
    return this.http.post<Doctor>(this.apiUrl + 'add', body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.router.navigate(["medicines"]);
    }, err => {
      this.registrationForm.reset();
    }); 
  } 

}
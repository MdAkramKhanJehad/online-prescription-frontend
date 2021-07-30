import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctorForm: any;
  dataSaved = false;
  doctors: Doctor[] = [];
  doctorIdUpdate = null;
  massage = null;

  constructor(private router: Router, private jwtHelper: JwtHelperService, private formbulider: FormBuilder, private doctorService: DoctorService) { }

  ngOnInit(): void {
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(["/login"]);
    }
    this.doctorForm = this.formbulider.group({  
      FirstName: ['', [Validators.required]],  
      LastName: ['', [Validators.required]],  
      Qualification: ['', [Validators.required]],  
      Username: ['', [Validators.required]],  
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });  
    
    this.loadDoctors();
  }

  isUserAuthenticated() {
    const token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['login']);
  }

  deleteDoctor(doctorId: number) {  
    if(doctorId != null){
      if (confirm("Are you sure you want to delete this ?")) {   
        this.doctorService.deleteDoctorById(doctorId).subscribe((tempData) => {  
          this.dataSaved = true;  
          this.massage = 'Medicine Deleted Succefully';  
          this.loadDoctors();  
          this.doctorIdUpdate = null;  
          this.doctorForm.reset();  
        });  
      }
    }  
  } 

  onFormSubmit(data: any) {  
    this.dataSaved = false;  
    const doctor = data;  
    this.CreateDoctor(doctor);  
    this.doctorForm.reset();  
  } 

  CreateDoctor(doctor: any) {
     if (this.doctorIdUpdate == null) { 
      this.doctorService.addDoctor(doctor).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Doctor added Successfully';  
          this.loadDoctors();  
          this.doctorIdUpdate = null;  
          this.doctorForm.reset();  
        }  
      );  
    } else {  
      console.log(this.doctorIdUpdate);
      this.doctorService.updateDoctor(doctor,this.doctorIdUpdate).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadDoctors();  
        this.doctorIdUpdate = null;  
        this.doctorForm.reset();  
      });  
    } 
  }

  loadDoctorToEdit(doctorId: number) {  
    this.doctorService.getDoctorById(doctorId).subscribe(doctor=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.doctorIdUpdate = doctor.dId;  
      this.doctorForm.controls['FirstName'].setValue(doctor.firstName);  
      this.doctorForm.controls['LastName'].setValue(doctor.lastName);  
      this.doctorForm.controls['Qualification'].setValue(doctor.qualification);  
      this.doctorForm.controls['Username'].setValue(doctor.username);  
      this.doctorForm.controls['Password'].setValue(doctor.password);  
      this.doctorForm.controls['Email'].setValue(doctor.email);  
    });  
  
  }  

  resetForm() {  
    this.doctorForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  } 

  loadDoctors(){
    this.doctorService.getAllDoctors().subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

}

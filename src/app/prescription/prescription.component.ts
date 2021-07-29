import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/models/doctor';
import { Medicine } from 'src/models/medicine';
import { Prescription } from 'src/models/prescription';
import { DoctorService } from '../doctor.service';
import { MedicineService } from '../medicine.service';
import { PrescriptionService } from '../prescription.service';
import { MultiSelectComponent } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  
  prescriptionForm: any;
  dataSaved = false;
  prescriptionIdUpdate = null;
  massage = null;
  prescriptions: Prescription[] = [];
  medicinesObjects: Medicine[] = [];
  medicines: String[] = [];
  medicineIds: Number[] = [];
  medicine: Medicine;
  dropdownList: String[] = [];
  dropdownSettings: any;
  doctor: Doctor;
  medicineNamesforEdit: String[] = [];
  
  constructor(private jwtHelper: JwtHelperService, private router: Router, private formbulider: FormBuilder, private prescriptionService: PrescriptionService, 
              private doctorService: DoctorService, private medicineService: MedicineService) { }

  ngOnInit(): void {
    if(localStorage.getItem("jwt") == null){
      this.router.navigate(["/login"]);
    }
    this.prescriptionForm = this.formbulider.group({  
      PatientName: ['', [Validators.required]],  
      PatientAge: ['', [Validators.required]],  
      DoctorId: ['', [Validators.required]],  
      DateTime: ['', [Validators.required]],
      MedicineIdsList: ['', [Validators.required]]
    });  
    this.loadPrescriptions();
    this.getMedicinesName();
    this.dropdownSettings = {
      singleSelection:false,
      idField: 'medicine_id',
      textField: 'medicine_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All'
    };
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

  
  onFormSubmit(data: any) {  
    this.dataSaved = false;  
    const prescription = data;
    this.getMedicinesId(data.MedicineIdsList);
    this.CreatePrescription(prescription);  
    this.prescriptionForm.reset();  
  }

  getMedicinesId(names: any){
    this.medicinesObjects.forEach(object => {
      if(names.includes(object.name)){
        this.medicineIds.push(object.mId);
      }
    })
  }

  CreatePrescription(prescription: any) {
    if (this.prescriptionIdUpdate == null) {
      
      this.prescriptionService.addPrescription(prescription, this.medicineIds).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record added Successfully';  
          this.loadPrescriptions();  
          this.prescriptionIdUpdate = null;  
          this.prescriptionForm.reset();  
        }  
      );  
    } else {  
      this.prescriptionService.updatePrescription(prescription, this.prescriptionIdUpdate, this.medicineIds).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadPrescriptions();  
        this.prescriptionIdUpdate = null;  
        this.prescriptionForm.reset();  
      });  
    } 
  }


  loadPrescriptionToEdit(prescriptionId: number) {  
    this.prescriptionService.getPrescriptionById(prescriptionId).subscribe(prescription=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.prescriptionIdUpdate = prescription.pId;  
      this.prescriptionForm.controls['PatientName'].setValue(prescription.patientName);  
      this.prescriptionForm.controls['PatientAge'].setValue(prescription.patientAge);  
      this.prescriptionForm.controls['DateTime'].setValue(prescription.dateTime);  
      this.prescriptionForm.controls['DoctorId'].setValue(prescription.doctorId);
      this.getNameForEdit(prescription.medicineIdsList);
      this.prescriptionForm.controls['MedicineIdsList'].setValue(this.medicineNamesforEdit);  
    });  
  
  }
  getNameForEdit(idList: number[]) {
    this.medicineService.getAllMedicine().subscribe(
      response => {
        var temp: String[] = [];
        for( var medObject of response){
          if(idList.includes(medObject.mId)){
            temp.push(medObject.name);
          }
        } 
        this.medicineNamesforEdit = temp;
      }
    );
  }


  deletePrescription(pId: number) {  
    if(pId != null){
      if (confirm("Are you sure you want to delete this ?")) {   
        this.prescriptionService.deletePrescriptionById(pId).subscribe((tempData) => {  
          this.dataSaved = true;  
          this.massage = 'Prescription Deleted Succefully';  
          this.loadPrescriptions();  
          this.prescriptionIdUpdate = null;  
          this.prescriptionForm.reset();  
        });  
      }
    }  
  } 


  onItemSelect($event){
    console.log("Event ::::::::: " + $event);
  }


  getMedicinesName(){
    this.medicineService.getAllMedicine().subscribe(
      response => {
        this.medicinesObjects = response;

        for( var medicineObject of this.medicinesObjects){
          this.medicines.push(medicineObject.name);
        }
        this.dropdownList = this.medicines;

      }
    );
  }


  resetForm() {  
    this.prescriptionForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }


  loadPrescriptions(){
    this.prescriptionService.getAllPrescription().subscribe(
      response => {
        this.prescriptions = response;


        this.prescriptions.forEach(prescription => {

          var id = prescription.doctorId
          this.doctorService.getDoctorById(id).subscribe(
            response => {
              this.doctor = response;

              prescription.doctorName = this.doctor.firstName +" "+ this.doctor.lastName;
            }
          );
          
          prescription.medicineIdsList.forEach(id2 => {
            this.medicineService.getMedicineById(id2).subscribe(
              response => {
                this.medicine = response;

                if (prescription.medicinesName == null){
                  prescription.medicinesName = this.medicine.name
                }else{
                  prescription.medicinesName = prescription.medicinesName +", "+ this.medicine.name
                }
              }
            );
          });
        });
        }
    );
  }
}

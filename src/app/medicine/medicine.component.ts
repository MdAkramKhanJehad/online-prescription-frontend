import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Medicine } from 'src/models/medicine';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicineForm: any;
  dataSaved = false;
  medicines: Medicine[] = [];
  medicineIdUpdate = null;
  massage = null;

  constructor(private router: Router, private jwtHelper: JwtHelperService, private formbulider: FormBuilder, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.medicineForm = this.formbulider.group({  
      MedicineName: ['', [Validators.required]],  
      Indication: ['', [Validators.required]],  
      Usage: ['', [Validators.required]],  
      Instruction: ['', [Validators.required]]
    });  
    this.loadMedicines();
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
    const medicine = data;  
    this.CreateMedicine(medicine);  
    this.medicineForm.reset();  
  } 

  CreateMedicine(medicine: any) {
     if (this.medicineIdUpdate == null) { 
      this.medicineService.addMedicine(medicine).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record added Successfully';  
          this.loadMedicines();  
          this.medicineIdUpdate = null;  
          this.medicineForm.reset();  
        }  
      );  
    } else {  
      this.medicineService.updateMedicine(medicine,this.medicineIdUpdate).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadMedicines();  
        this.medicineIdUpdate = null;  
        this.medicineForm.reset();  
      });  
    } 
  }

  loadMedicineToEdit(medicineId: number) {  
    this.medicineService.getMedicineById(medicineId).subscribe(medicine=> {  
      this.massage = null;  
      this.dataSaved = false;  
      this.medicineIdUpdate = medicine.mId;  
      this.medicineForm.controls['MedicineName'].setValue(medicine.name);  
      this.medicineForm.controls['Indication'].setValue(medicine.indication);  
      this.medicineForm.controls['Usage'].setValue(medicine.usage);  
      this.medicineForm.controls['Instruction'].setValue(medicine.instruction);  
    });  
  
  }  
  
  deleteMedicine(medicineId: number) {  
    if(medicineId != null){
      if (confirm("Are you sure you want to delete this ?")) {   
        this.medicineService.deleteMedicineById(medicineId).subscribe((tempData) => {  
          this.dataSaved = true;  
          this.massage = 'Medicine Deleted Succefully';  
          this.loadMedicines();  
          this.medicineIdUpdate = null;  
          this.medicineForm.reset();  
        });  
      }
    }  
  } 
  
  
  resetForm() {  
    this.medicineForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  }  


  loadMedicines(){
    this.medicineService.getAllMedicine().subscribe(
      response => {
        this.medicines = response;
      }
    );
  }

}

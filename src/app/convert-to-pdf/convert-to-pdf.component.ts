import { Component,  ViewChild, ElementRef } from '@angular/core';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Prescription } from 'src/models/prescription';
import { PrescriptionService } from '../prescription.service';
import {ActivatedRoute } from "@angular/router";
import { concat } from 'rxjs';
import { MedicineService } from '../medicine.service';
import { DoctorService } from '../doctor.service';
import { Doctor } from 'src/models/doctor';
import { Medicine } from 'src/models/medicine';


@Component({
  selector: 'app-convert-to-pdf',
  templateUrl: './convert-to-pdf.component.html',
  styleUrls: ['./convert-to-pdf.component.css']
})
export class ConvertToPdfComponent {
  title = 'Online-Prescription';
  prescriptionId: any;
  prescription: Prescription;
  medicines: Medicine[] = [];
  doctor: Doctor;


  @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor(private prescriptionService: PrescriptionService, private medicineService: MedicineService, private doctorService:DoctorService, private activatedRoute: ActivatedRoute){ 
    this.activatedRoute.params.subscribe(param=>
        this.prescriptionId = param['id']);
  }
  ngOnInit(){
    this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe(pres =>{
      this.prescription = pres;
      console.log(this.prescription.patientName);
      console.log(this.prescription.patientAge);
      
      
      this.medicineService.getAllMedicine().subscribe(
          response => {
            // this.medicinesObjects = response;
    
            for( var medicineObject of response){
              if(this.prescription.medicineIdsList.includes(medicineObject.mId)){
                this.medicines.push(medicineObject);
              }                
            }
          }
        );

        this.doctorService.getDoctorById(this.prescription.doctorId).subscribe(
          response => {
            this.doctor = response;
            this.prescription.doctorName = response.firstName +" "+ response.lastName;
            console.log(this.prescription.doctorName);
          }
        );
    });
  }


  public generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('prescription.pdf');
    });
  }
}


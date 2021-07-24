import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/models/prescription';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  prescriptions: Prescription[] = [];
  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(){
    this.prescriptionService.getAllPrescription().subscribe(
      response => {
        this.prescriptions = response;
      }
    );
  }

}

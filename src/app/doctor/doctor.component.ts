import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/models/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[] = [];
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(){
    this.doctorService.getAllDoctors().subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

}

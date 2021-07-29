import { Component, OnInit } from '@angular/core';
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

  doctors: Doctor[] = [];

  constructor(private router: Router, private jwtHelper: JwtHelperService, private doctorService: DoctorService) { }

  ngOnInit(): void {
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

  loadDoctors(){
    this.doctorService.getAllDoctors().subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

}

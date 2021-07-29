import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent{
  invalidLogin: boolean;
  loginForm: any;

  constructor(private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:5002/api/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/prescriptions"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent{
  invalidLogin: boolean;
  loginForm: any;

  constructor(private router:Router, private http: HttpClient, private formbulider: FormBuilder,) { }

  ngOnInit(): void {
    this.loginForm = this.formbulider.group({  
      Username: ['', [Validators.required]],  
      Password: ['', [Validators.required]],  
    }); 
    // if(localStorage.getItem('jwt')!=null){
    //   this.router.navigateByUrl('medicines');
    // }
  }

  login(form: any) {
    const credentials = {
      "Username": String(form.Username),
      "Password": String(form.Password)
    }
    
    this.http.post("http://localhost:5002/api/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["medicines"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}

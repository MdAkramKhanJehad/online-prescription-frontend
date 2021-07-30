import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';  

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorService } from './doctor.service';
import { MedicineService } from './medicine.service';
import { PrescriptionService } from './prescription.service';
import { MedicinePrescriptionService} from './medicine-prescription.service';
import { DoctorPrescriptionService } from './doctor-prescription.service';
import { DoctorComponent } from './doctor/doctor.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { AppRoutingModule } from './app-routing.module';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { ConvertToPdfComponent } from './convert-to-pdf/convert-to-pdf.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    MedicineComponent,
    PrescriptionComponent,
    DoctorDetailsComponent,
    LogInComponent,
    RegisterComponent,
    LogoutComponent,
    ConvertToPdfComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LogInComponent },
      { path: 'logout', component: LogoutComponent},
      { path: 'prescriptions/generatePdf/:id', component: ConvertToPdfComponent},
      { path: 'register', component: RegisterComponent },
      { path: 'doctors', component: DoctorComponent, canActivate:[AuthGuard] },
      { path: 'medicines', component: MedicineComponent, canActivate:[AuthGuard] },
      { path: 'prescriptions', component: PrescriptionComponent, canActivate:[AuthGuard] },
      { path: 'doctors/editProfile/:dId', component: DoctorDetailsComponent, canActivate:[AuthGuard] },
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:5002'],
        disallowedRoutes: [] 
      }
    }),
    AppRoutingModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  providers: [
    DoctorService, 
    MedicineService, 
    PrescriptionService, 
    MedicinePrescriptionService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    DoctorPrescriptionService,
    MatDatepickerModule,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

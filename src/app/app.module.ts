import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    MedicineComponent,
    PrescriptionComponent,
    DoctorDetailsComponent,
    PrescriptionDetailsComponent,
    MedicineDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
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
    DoctorPrescriptionService,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

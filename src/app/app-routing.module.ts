import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorComponent } from './doctor/doctor.component';
import { LogInComponent } from './log-in/log-in.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionDetailsComponent } from './prescription-details/prescription-details.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'medicines', component: MedicineComponent },
  { path: 'prescriptions', component: PrescriptionComponent },
  { path: 'doctors/edit/:dId', component: DoctorDetailsComponent },
  { path: 'medicines/edit/:name', component: MedicineDetailsComponent },
  { path: 'prescriptions/edit/:pId', component: PrescriptionDetailsComponent },
  // { path: 'editprofile', component: PrescriptionComponent },
  // { path: 'editprescriptions', component: PrescriptionComponent },
  // { path: 'editmedicine', component: PrescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
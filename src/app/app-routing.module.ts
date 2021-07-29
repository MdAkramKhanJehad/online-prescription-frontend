import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LogInComponent } from './log-in/log-in.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorComponent },
  { path: 'medicines', component: MedicineComponent, canActivate:[AuthGuard] },
  { path: 'prescriptions', component: PrescriptionComponent },
  { path: 'doctors/editProfile/:dId', component: DoctorDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
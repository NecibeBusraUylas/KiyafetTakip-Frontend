//Necibe Büşra Uylaş
import { StaffListComponent } from './components/staff/staff-list/staff-list.component';
import { LoginGuard } from './guards/login.guard';
import { ClotheAddComponent } from './components/clothe-add/clothe-add.component';
import { StaffUpdateComponent } from './components/staff/staff-update/staff-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { StaffComponent } from './components/staff/staff.component';
const routes: Routes = [{
  path:"", pathMatch:"full", component:LoginComponent},

{path:"staffs", component:StaffComponent},
{path:"staffs/filter/nameSurname/:nameSurname",component:StaffComponent},
{path:"receivers", component:ReceiverComponent},
{path:"receivers/clothe/:clotheId", component:ReceiverComponent},
{path:"receivers/filter/nameSurname/:nameSurname",component:ReceiverComponent},

{path:"login", component:LoginComponent},
{path:"register", component:RegisterComponent},
{path:"profile", component:ProfileComponent},

{path:"staffs/update/:id", component:StaffUpdateComponent},
{path:"staffs/list", component:StaffListComponent},
{path:"clothes/add", component:ClotheAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Staff } from './../../../models/staff/staff';
import { FormBuilder } from '@angular/forms';
import { StaffService } from './../../../services/staff.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {

  staffs: Staff[] = [];
  dataLoaded = false;
  filterText1="";
  
  constructor(private formBuilder:FormBuilder,
    private staffService:StaffService, 
    private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService) {}

  ngOnInit(): void {
          this.getStaffs()
          this.activatedRoute.params.subscribe(params=>{
            if(params["nameSurname"]){
              this.getStaffsByNameSurname(params["nameSurname"])
            }else{
              this.getStaffs()
            }
          })
  }

  getStaffs() {
    this.staffService.getStaffs().subscribe(response=>{
      this.staffs = response.data;
      this.dataLoaded = true;
    })   
  }

  getStaffsByNameSurname(nameSurname:string) {
    this.staffService.getStaffsByNameSurname(nameSurname).subscribe(response=>{
      this.staffs = response.data;
      this.dataLoaded = true;
    })   
  }
}

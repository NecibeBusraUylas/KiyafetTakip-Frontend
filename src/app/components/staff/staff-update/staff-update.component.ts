import { StaffService } from './../../../services/staff.service';
import { Staff } from './../../../models/staff/staff';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-staff-update',
  templateUrl: './staff-update.component.html',
  styleUrls: ['./staff-update.component.css']
})
export class StaffUpdateComponent implements OnInit {

  staffUpdateForm: FormGroup;
  staffId:Staff
  staffEmployeeNumber:Staff
  staffNameSurname:Staff
  staffCardNumber:Staff
  staffDivision:Staff
  staffDepartment:Staff
  staffIsActive:Staff
  staffIsAdded:Staff

  constructor(
    private formBuilder: FormBuilder,
    private staffService: StaffService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getStaffById(params["id"])
    })
    this.createStaffUpdateForm();
  }

  getStaffById(id: number){
    this.staffService.getStaffByStaffId(id).subscribe(response => {  
      const mapped = Object.entries(response.data).map(([type, value]) => ({type, value}));
      this.staffId = mapped[0].value;
      this.staffEmployeeNumber = mapped[1].value;
      this.staffNameSurname = mapped[2].value;
      this.staffCardNumber = mapped[3].value;
      this.staffDepartment = mapped[4].value;
      this.staffDivision = mapped[5].value;
      this.staffIsActive = mapped[6].value;
      this.staffIsAdded = mapped[7].value;
      this.createStaffUpdateForm();
    })
  }

  createStaffUpdateForm() {
    this.staffUpdateForm = this.formBuilder.group({
      id: [this.staffId, Validators.required],
      employeeNumber: [this.staffEmployeeNumber, Validators.required],
      nameSurname: [this.staffNameSurname, Validators.required],
      cardNumber: [this.staffCardNumber, Validators.required],
      department: [this.staffDepartment, Validators.required],
      division: [this.staffDivision, Validators.required],
      isActive: [this.staffIsActive, Validators.required],
      isAdded: [this.staffIsAdded, Validators.required]
    })
  }

  staffs(){
    return this.router.navigate(["/staffs"]);
  }

  update() {
    if (this.staffUpdateForm.valid) {
      let staff:Staff = Object.assign({}, this.staffUpdateForm.value)
      console.log(staff)
      this.staffService.update(staff).subscribe(response => {
        this.staffService.getStaffs();
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["staffs/list"]).then(r => window.location.reload())
      })
    } else {
      this.toastrService.warning("Formunuz eksik", "Dikkat!")
    }
  }
}

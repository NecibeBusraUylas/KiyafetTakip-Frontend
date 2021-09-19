import { Clothe } from './../../models/clothe/clothe';
import { Staff } from '../../models/staff/staff';
import { Receiver } from '../../models/receiver/receiver';
import { ReceiverService } from './../../services/receiver.service';
import { StaffService } from './../../services/staff.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClotheService } from 'src/app/services/clothe.service';
import {FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms"
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffs: Staff[] = [];
  receivers:Receiver[]=[];
  clothe: string;
  clotheType: string[] = [];
  clothes: Clothe[] = [];
  dataLoaded = false;
  filterText1="";
  filterText2="";
  receiver=new Receiver();
  receiver2:Receiver[]
  clotheAddForm:any;
  isStart:boolean=false;
  totalRecords:number;
  page:number=1
  
  constructor(private formBuilder:FormBuilder,
    private staffService:StaffService, 
    private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService,
    private receiverService:ReceiverService,
    private clotheService:ClotheService) {}

  ngOnInit(): void {
     this.getClothes()
     this.createClotheAddForm()
      this.activatedRoute.params.subscribe(params=>{
        if(params["nameSurname"]){
          this.getStaffsByNameSurname(params["nameSurname"])
        }else{
          this.getStaffs()
        }
      })
      this.activatedRoute.params.subscribe(params=>{
        if(params["cardNumber"]){
          this.getStaffsByCardNumber(params["cardNumber"])
        }else{
          this.getStaffs()
        }
      })
  }

  getStaffs() {
    this.staffService.getStaffs().subscribe(response=>{
      this.staffs = response.data;
      this.totalRecords=response.data.length
      this.dataLoaded = true;
    })   
  }

  getClothes() {
    this.clotheService.getClothes().subscribe(response=>{
      this.clothes = response.data;
      this.dataLoaded = true;
    })   
  }

  getReceivers() {
    this.receiverService.getReceivers().subscribe(response=>{
      this.receivers = response.data;
      this.dataLoaded = true;
    })   
  }

  getStaffsByNameSurname(nameSurname:string) {
    this.staffService.getStaffsByNameSurname(nameSurname).subscribe(response=>{
      this.staffs = response.data;
      this.dataLoaded = true;
    })   
  }

  getStaffsByCardNumber(cardNumber:string) {
    this.staffService.getStaffsByCardNumber(cardNumber).subscribe(response=>{
      this.staffs = response.data;
      this.dataLoaded = true;
    })   
  }

  createClotheAddForm(){
    this.clotheAddForm = this.formBuilder.group({
    clothe:["",Validators.required]
    })
    }

  addToReceiver(staff:Staff){
    
    this.clothe=Object.assign({},this.clotheAddForm.value)
    this.clotheType= JSON.stringify(this.clothe).split(':"');
    this.receiver.id=staff.id; 
    this.receiver.employeeNumber=staff.employeeNumber
    this.receiver.nameSurname=staff.nameSurname;
    this.receiver.cardNumber=staff.cardNumber;
    this.receiver.division=staff.division;
    this.receiver.department=staff.department;
    this.receiver.clothe=(this.clotheType)[1];
    this.receiver.time=new Date().toLocaleString();
    this.receiverService.getById(this.receiver.id).subscribe(response => {
      this.receiver2 = response.data
      if(response.data){
        this.toastrService.error(staff.nameSurname,'Zaten kıyafet almış!');
      }else{
        if(this.clotheType[1]=='"}'){
            this.toastrService.error(staff.nameSurname,'Kıyafet seçimi yapılmadı!');
        }else{
          staff.isAdded=1;
          this.staffService.update(staff).subscribe(response=>{
          });
          this.toastrService.success("Teslim edilenlere eklendi.",staff.nameSurname);
          this.receiverService.add(this.receiver).subscribe(response=>{
          });
          window.location.reload();
        }
      }
    });
  }
}
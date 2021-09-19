import { Validators } from '@angular/forms';
import { ClotheService } from './../../services/clothe.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothe-add',
  templateUrl: './clothe-add.component.html',
  styleUrls: ['./clothe-add.component.css']
})
export class ClotheAddComponent implements OnInit {

  clotheAddForm : FormGroup;
  constructor(private formBuilder:FormBuilder, 
    private clotheService:ClotheService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createClotheAddForm();
  }

  createClotheAddForm(){
     this.clotheAddForm = this.formBuilder.group({
       type:["",Validators.required]
     })
  }

  add(){
    if(this.clotheAddForm.valid){
      let clotheModel = Object.assign({},this.clotheAddForm.value)
      this.clotheService.add(clotheModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }   
  }
}
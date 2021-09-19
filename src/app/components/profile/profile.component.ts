import { User } from './../../models/user/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  userUpdateForm:FormGroup;

  constructor(
    private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  getUser(){
    this.user = this.localStorageService.getCurrentUser();
  }

  createUserUpdateForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[this.user.id,Validators.required],
      nameSurname:[this.user.nameSurname,Validators.required],
      userName:[this.user.userName,Validators.required],
      password:[""],
      confirmPassword:[""]
    })
  }


  update(){
    if(this.userUpdateForm.invalid){
      this.toastrService.warning("Bütün alanları doldurduğunuzdan emin olun","Dikkat");
      return;
    }

    if(this.userUpdateForm.value["password"] != this.userUpdateForm.value["confirmPassword"]){
      this.toastrService.error("Şifreler birbiriyle eşleşmiyor","Hata");
      return;
    }

    delete this.userUpdateForm.value["confirmPassword"];

    let userModel:User = Object.assign({},this.userUpdateForm.value);
    
    this.authService.update(userModel).subscribe(response => {
      this.localStorageService.removeCurrentUser();
      delete userModel.password;
      this.localStorageService.setCurrentUser(userModel);
      this.router.navigate(["/cars"])
      
      return this.toastrService.success("Bilgileriniz güncellendi","Başarılı");
    },responseError => {
      if(responseError.error.ValidationErrors){
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
        }
        return;
      }
      this.toastrService.error(responseError.error.StatusCode + " " + responseError.error.Message, responseError.name)
    });
  }
}

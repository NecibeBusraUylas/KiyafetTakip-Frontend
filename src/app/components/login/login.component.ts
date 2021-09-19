import { LoginModel } from './../../models/login/login';
import { User } from './../../models/user/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser:User;
  currentUserUserName: string = '';
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    //this.setCurrentCustomerEmail();
    this.createLoginForm();
    this.checkUserExists();
  }

  checkUserExists(){
    return this.authService.isAuthenticated() 
              ? this.router.navigateByUrl("/")
              : this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      userName:["",Validators.required],
      password:["",Validators.required],    
    })
  }
  

  login(){
    if(this.loginForm.invalid){
      this.toastrService.warning("Bütün alanları doldurunuz","Hata");
      return;
    }

      let loginModel:LoginModel=Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success("Başarıyla giriş yapıldı","Başarılı")
        this.localStorageService.setToken("token",response.data.token)
        
        this.setCurrentUserByUserName(loginModel.userName);
        return this.router.navigateByUrl('/staffs');             
      },responseError=>{
        return this.toastrService.error(responseError.error,"Hata");
      })   
    
  }

  setCurrentUserByUserName(userName:string){
    this.userService.getUserByUserName(userName).subscribe(response=>{
      this.currentUser=response.data 
      this.localStorageService.setCurrentUser(this.currentUser)
    })    
  }

  getUserByUserName(userName: string) {
    this.userService.getUserByUserName(userName).subscribe(responseSuccess => {
       this.currentUser = responseSuccess.data;
       this.localStorageService.setCurrentUser(this.currentUser);
    });
 }
}
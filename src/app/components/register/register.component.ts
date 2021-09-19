import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user/user';
import { Register } from 'src/app/models/register/register';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  currentUser:User;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,   
    private userService:UserService 
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      nameSurname: ["", Validators.required],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    })
  }

  register(){
    if (this.registerForm.invalid) {
      this.toastrService.warning("Bütün alanları doldurunuz", "Dikkat");
      return;
    }

    if (this.registerForm.value["password"] != this.registerForm.value["confirmPassword"]) {
      this.toastrService.error("Şifreler eşleşmiyor", "Hata");
      return;
    }

    delete this.registerForm.value["confirmPassword"];
    let register:Register = Object.assign({}, this.registerForm.value);

    this.authService.register(register).subscribe(response => {
      this.localStorageService.setToken("token", response.data.token);
      this.getCurrentUserByUserName(register.userName)
      this.toastrService.success("Kayıt oldunuz", "Başarılı");
      return this.router.navigateByUrl('/login');
    }, responseError => {
      if (responseError.error.Errors) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Doğrulama Hatası');
        }
        return;
      }
      this.toastrService.error(responseError.status + ' ' + responseError.name, responseError.error);
    });
  }

  getCurrentUserByUserName(userName:string){
    this.userService.getUserByUserName(userName).subscribe(response=>{
      this.currentUser=response.data 
      this.localStorageService.setCurrentUser(this.currentUser)
    })    
  }
}
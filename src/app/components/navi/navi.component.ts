import { User } from './../../models/user/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userOrAdmin:string=""

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  method(): boolean {
    let isAdmin = this.localStorageService.getCurrentUser()
    
    if (isAdmin) {
      if (isAdmin.admin) {
        this.userOrAdmin="Yönetici";
        return true;
      }
    }
    this.userOrAdmin="Kullanıcı";
    return false;
  }

  isAdmin(){
    if(this.userOrAdmin=="Yönetici"){
    return true;}
    return false;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  signOut() {
    this.localStorageService.removeToken("token");
    this.localStorageService.removeCurrentUser();
    this.toastrService.success("Çıkış yapıldı", "Başarılı");
    return this.router.navigateByUrl("/login");
  }

  staffs(){
    return this.router.navigate(["/staffs"]);
  }

  register(){
    return this.router.navigate(["/register"]);
  }
  
  clotheAdd(){
    return this.router.navigate(["/clothes/add"]);
  }

  staffUpdate(){
    return this.router.navigate(["/staffs/list"]);
  }

  getCurrentUser(): User {
    return this.localStorageService.getCurrentUser();
  }
}
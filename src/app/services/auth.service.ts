import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { LoginModel } from '../models/login/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/token/token';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, 
    private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=environment.apiUrl+"auth/login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=environment.apiUrl+"auth/register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }  

  update(user:User):Observable<SingleResponseModel<TokenModel>>{
    let newPath = environment.apiUrl+"auth/update";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
  }

  isAuthenticated():boolean {
    return !!this.localStorageService.getToken("token")
  }
}

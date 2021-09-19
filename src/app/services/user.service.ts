import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath=environment.apiUrl+"users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserDetails(): Observable<ListResponseModel<User>> {
    let newPath=environment.apiUrl+"users/getuserdetail";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserById(userId: number): Observable<ListResponseModel<User>> {
    let newPath = environment.apiUrl + "users/getuserdetailbyid?id=" + userId;
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getUserByUserName(userName:string):Observable<SingleResponseModel<User>>{
    let newPath = environment.apiUrl + "users/getbyusername?userName="+userName;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel>{
      let newPath=environment.apiUrl+"users/update"
    return this.httpClient.put<ResponseModel>(newPath, user);
  }
}

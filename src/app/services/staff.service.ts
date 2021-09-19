import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { Staff } from '../models/staff/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient:HttpClient) { }

  getStaffs():Observable<ListResponseModel<Staff>>{
    let newPath = environment.apiUrl + "staffs/getall";
    return this.httpClient.get<ListResponseModel<Staff>>(newPath);
}

  getById(id : number): Observable<ListResponseModel<Staff>>{
    let newPath =  environment.apiUrl + "staffs/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Staff>>(newPath);
  }

  add(staff: Staff) : Observable<ResponseModel>{
    let newPath = environment.apiUrl + "staffs/add"
    return this.httpClient.post<ResponseModel>(newPath, staff);
  }

  update(staff: Staff) : Observable<ResponseModel>{
    let newPath = environment.apiUrl+ "staffs/update"
    return this.httpClient.post<ResponseModel>(newPath, staff);
  }

  delete(staff: Staff): Observable<ResponseModel>{
    let newPath =  environment.apiUrl +"staffs/delete";
    return this.httpClient.post<ResponseModel>(newPath, staff);
  }
  
  getStaffsByNameSurname(nameSurname:string):Observable<ListResponseModel<Staff>> {
    let newPath = environment.apiUrl + "staffs/getbynamesurname?nameSurname="+nameSurname
    return this.httpClient.get<ListResponseModel<Staff>>(newPath);
  }

  getStaffsByCardNumber(cardNumber:string):Observable<ListResponseModel<Staff>> {
    let newPath = environment.apiUrl + "staffs/getbycardnumber?cardNumber="+cardNumber
    return this.httpClient.get<ListResponseModel<Staff>>(newPath);
  }

  getStaffByStaffId(id:number): Observable<ListResponseModel<Staff>> {
    let newPath=environment.apiUrl+"staffs/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Staff>>(newPath);
  }
}
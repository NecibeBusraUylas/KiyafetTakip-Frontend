import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { Receiver } from '../models/receiver/receiver';

@Injectable({
  providedIn: 'root'
})
export class ReceiverService {

  constructor(private httpClient:HttpClient) { }

  getReceivers():Observable<ListResponseModel<Receiver>>{
      let newPath = environment.apiUrl + "receivers/getall";
      return this.httpClient.get<ListResponseModel<Receiver>>(newPath);
  }

  getById(id : number): Observable<ListResponseModel<Receiver>>{
    let newPath =  environment.apiUrl + "receivers/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Receiver>>(newPath);
  }

  add(receiver: Receiver) : Observable<ResponseModel>{  
    let newPath =  environment.apiUrl + "receivers/add";
    return this.httpClient.post<ResponseModel>(newPath, receiver);
  }

  update(receiver: Receiver) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"receivers/update", receiver);
  }

  delete(receiver: Receiver): Observable<ResponseModel>{
    let newPath =  environment.apiUrl +"receivers/delete";
    return this.httpClient.post<ResponseModel>(newPath, receiver);
  }
  
  getReceiversByNameSurname(nameSurname:string):Observable<ListResponseModel<Receiver>> {
    let newPath = environment.apiUrl + "receivers/getbynamesurname?nameSurname="+nameSurname
    return this.httpClient.get<ListResponseModel<Receiver>>(newPath);

  }

  getReceiversByCardNumber(cardNumber:string):Observable<ListResponseModel<Receiver>> {
    let newPath = environment.apiUrl + "receivers/getbycardnumber?cardNumber="+cardNumber
    return this.httpClient.get<ListResponseModel<Receiver>>(newPath);
  }

  getReceiversByClothe(clothe:string):Observable<ListResponseModel<Receiver>> {
    let newPath = environment.apiUrl + "receivers/getbyclothe?clothe="+clothe
    return this.httpClient.get<ListResponseModel<Receiver>>(newPath);
  }

  getReceiverByReceiverId(id:number): Observable<ListResponseModel<Receiver>> {
    let newPath=environment.apiUrl+"receivers/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Receiver>>(newPath);
  }
}

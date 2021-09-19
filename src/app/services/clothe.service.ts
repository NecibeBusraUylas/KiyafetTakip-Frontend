import { Clothe } from '../models/clothe/clothe';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ClotheService {

  constructor(private httpClient:HttpClient) { }

  getClothes():Observable<ListResponseModel<Clothe>>{
    let newPath =  environment.apiUrl + "clothes/getall";
    return this.httpClient.get<ListResponseModel<Clothe>>(newPath);
      }

  getById(id : number): Observable<ListResponseModel<Clothe>>{
    let newPath =  environment.apiUrl + "clothes/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Clothe>>(newPath);
  }

  add(clothe: Clothe) : Observable<ResponseModel>{
    let newPath = environment.apiUrl + "clothes/add"
    return this.httpClient.post<ResponseModel>(newPath, clothe);
  }

  update(clothe: Clothe) : Observable<ResponseModel>{
    let newPath = environment.apiUrl+ "clothes/update"
    return this.httpClient.post<ResponseModel>(newPath, clothe);
  }

  delete(clothe: Clothe): Observable<ResponseModel>{
    let newPath =  environment.apiUrl +"clothes/delete";
    return this.httpClient.post<ResponseModel>(newPath, clothe);
  }
}
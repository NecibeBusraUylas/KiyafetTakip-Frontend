import { Injectable } from '@angular/core';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  tokenKey:string = "token";
  currentUser:string = "currentUser";
  constructor() { }

  setToken(key:string, value:any) {
    localStorage.setItem(key, value);
 }

 getToken(key:string):any {
    return localStorage.getItem(key);
 }

 removeToken(key:string) {
    localStorage.removeItem(key);
 }

 setCurrentUser(currentUserValue:User) {
  localStorage.setItem(this.currentUser, JSON.stringify(currentUserValue));
 }

 getCurrentUser(): User {
  var user = JSON.parse(localStorage.getItem(this.currentUser));
  return user;
 }
 
 removeCurrentUser() {
  localStorage.removeItem(this.currentUser);
 }
}
import { User } from './../../models/user/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:User[]=[];
  dataLoaded=false;

  constructor(private userService:UserService ) { }
 
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe(response=>{
      this.users=response.data;
      this.dataLoaded=true;
    })
  }

}

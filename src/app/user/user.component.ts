import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  message;
  constructor(private userService: UserService) { }

  forUser(){
    this.userService.forAdmin().subscribe(
      (response)=> {
        console.log(response);
        this.message = response;
      },

    )
  }
  ngOnInit(): void {
  }

}

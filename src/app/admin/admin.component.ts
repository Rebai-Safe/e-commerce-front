import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  message;
  constructor(private userService: UserService) { }

   ngOnInit(): void {
   
      this.userService.forAdmin().subscribe(
        (response)=> {
          console.log(response);
          this.message = response;
        },
  
      )
    
  }

}

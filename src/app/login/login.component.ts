import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private userAuthService: UserAuthService
    ,private router: Router) { }

  ngOnInit(): void {
  }
  
  login(loginForm){
    console.log(loginForm.value.userPassword);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken);
        
        const role = response.user.roles[0].roleName;
        console.log(role);
         if(role === 'Admin'){
         this.router.navigate(['/admin'])
         }
         else {
          this.router.navigate(['/user'])
         }
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
}

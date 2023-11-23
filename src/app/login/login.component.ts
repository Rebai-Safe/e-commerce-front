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

  constructor(private userAuthService: UserAuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm){
    console.log("from login component ", loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.roles[0].roleName;
        if(role === 'ADMIN'){
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

  goToRegisterUser() {
    this.router.navigate(['/register']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private userAuthService: UserAuthService,
              private userService: UserService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [''],
      userPassword: ['']
    })
  }

  login(){
    console.log("from login component ", this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log("from login component: ",response)
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken);
        this.router.navigate([''])
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

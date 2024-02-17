import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiResponse} from '../model/api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
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
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: ApiResponse) => {
        console.log("Response from login component: ",response)
        this.userAuthService.setRoles(response.object.user.roles)
        this.userAuthService.setToken(response.object.jwtToken);
        this.router.navigate([''])
      },error: (error) => {
        this.errorMessage = error.error.message;
        console.log("Error from login component: ",error)
      }
    })
  }

  goToRegisterUser() {
    this.router.navigate(['/register']);
  }
}

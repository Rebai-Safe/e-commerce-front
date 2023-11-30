import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [''],
      userFirstName:  [''],
      userLastName: [''],
      userPassword: [''],
    })
  }

  register() {
    this.userService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log("form register user: ", response);
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("error from register user: ",error);
      }
    )
  }
}

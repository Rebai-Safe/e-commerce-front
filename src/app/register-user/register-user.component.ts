import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      }, (error) => {
        console.log("error from register user: ",error);
      }
    )
  }
}

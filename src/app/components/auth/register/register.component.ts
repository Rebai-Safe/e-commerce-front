import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage-service';
import {UserService} from 'src/app/services/user/user.service';

@Component({selector: 'app-register', templateUrl: './register.component.html', styleUrls: ['./register.component.css'],
encapsulation: ViewEncapsulation.None})
export class RegisterComponent implements OnInit {

    registerForm : FormGroup;

    constructor(private fb : FormBuilder, private router : Router, private userService : UserService, private authSevice : AuthService,
      private tokenStorage:TokenStorageService) {
        if(this.userService.isLoggedIn())
         this.router.navigate(['/home'])
      }

    /**
     * create register form group
     * it's a nested form group
     */
    ngOnInit(): void {
        this.registerForm = this.fb.group({
            authCredentials: new FormGroup(
                {
                    userName: new FormControl('', Validators.required),
                    password: new FormControl('', Validators.required)
                }
            ),
            profileCredentials: new FormGroup(
                {
                    firstName: new FormControl('', Validators.required),
                    lastName: new FormControl('', Validators.required),
                    email: new FormControl('', [Validators.required, Validators.email]),
                    country: new FormControl('', Validators.required),
                   
                }
            )

        })
    }

  /**
   * use getter instead of calling the whole register form in register()
   */
    get username() {
        return this.registerForm.get('authCredentials').get('userName');
    }

    /**
   * use getter instead of calling the whole register form in register()
   */
     get password() {
      return this.registerForm.get('authCredentials').get('password');
  }


    register() {
        const userCredentials = {
            userName: this.username.value,
            password: this.password.value,
        }
         this.registerForm.get('profileCredentials').get('country').setValue(this.registerForm.get('profileCredentials').get('country').value.alpha3Code);
         console.log(this.registerForm.value);

        this.userService.registerUser(this.registerForm.value).subscribe(res => {
            this.authSevice.authenticate(userCredentials).subscribe(authRes => {
              this.tokenStorage.saveToken(authRes.message);
              this.userService.currentUser= authRes.object;
              this.router.navigate(['/home']);
            },
            error => {
              console.log(error);
            })
        })
    }

}

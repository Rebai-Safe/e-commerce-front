import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/auth/token-storage-service';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('invalidCredentials', {static:false}) invalidCredTemp: TemplateRef<any>;
   authForm: FormGroup;
   showPassword=false;
   modalRef:BsModalRef;


  constructor(private authService:AuthService, private router:Router, private cartService:CartService,
    private alertService: AlertService, private fb:FormBuilder,private tokenStorage:TokenStorageService,private userService: UserService,
    private modalService:BsModalService) {
      if(this.userService.isLoggedIn())
      this.router.navigate(['/home'])
     }

  ngOnInit(): void {
     this.authForm=this.fb.group({
       userName: new FormControl('',Validators.required),
       password: new FormControl('',Validators.required),
     })
  }

  userLogin(){
    this.authService.authenticate(this.authForm.value).subscribe(res => {
       this.tokenStorage.saveToken(res.message);
       this.userService.currentUser= res.object;
       this.router.navigate(['/home']);
   
      }, error => {
      this.alertService.error(error);
      this.openModal(this.invalidCredTemp);
    });
  }

  openModal(template:TemplateRef<any>){
    this.modalRef = this.modalService.show(template)
  }

  hide(){
    this.modalRef.hide();
  }
}
